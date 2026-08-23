import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  cancelAppointment,
  checkInAppointment,
  checkOutAppointment,
  confirmAppointment,
} from "../../api/appointment.api";
import { useDismissableMenu } from "../../hooks/useDismissableMenu";
import { useToast } from "../common/useToast";
import CancelAppointmentModal from "./CancelAppointmentModal";

const STATUS_ACTIONS = {
  scheduled: [{ key: "confirm", label: "Confirm", fn: confirmAppointment }],
  confirmed: [{ key: "check_in", label: "Check In", fn: checkInAppointment }],
  checked_in: [{ key: "check_out", label: "Check Out", fn: checkOutAppointment }],
  rescheduled: [{ key: "confirm", label: "Confirm", fn: confirmAppointment }],
};

function KebabIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  );
}

const CANCELLABLE_STATUSES = ["scheduled", "confirmed", "checked_in", "rescheduled"];

function AppointmentActionsMenu({ appointment }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const menuRef = useRef(null);

  useDismissableMenu(menuRef, isOpen, () => setIsOpen(false));

  const statusActions = STATUS_ACTIONS[appointment.status] ?? [];
  const canCancel = CANCELLABLE_STATUSES.includes(appointment.status);

  const actionMutation = useMutation({
    mutationFn: ({ fn }) => fn(appointment.id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["doctor-dashboard"] });
      showToast(`Appointment ${variables.label.toLowerCase()}ed successfully.`, { type: "success" });
      setIsOpen(false);
    },
    onError: () => {
      showToast("Unable to update this appointment. Please try again.", { type: "error" });
    },
  });

  async function handleCancelConfirm() {
    setIsCancelling(true);
    setCancelError("");
    try {
      await cancelAppointment(cancelTarget.id);
      queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["doctor-dashboard"] });
      showToast("Appointment cancelled.", { type: "success" });
      setCancelTarget(null);
      setIsOpen(false);
    } catch {
      setCancelError("Unable to cancel this appointment. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  }

  const hasActions = statusActions.length > 0 || canCancel;

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        disabled={!hasActions}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700"
        aria-label="Appointment actions"
      >
        <KebabIcon />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          {statusActions.map((action) => (
            <button
              key={action.key}
              type="button"
              disabled={actionMutation.isPending}
              onClick={() => actionMutation.mutate(action)}
              className="block w-full px-3.5 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {action.label}
            </button>
          ))}
          {canCancel && (
            <button
              type="button"
              onClick={() => setCancelTarget(appointment)}
              className="block w-full px-3.5 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              Cancel
            </button>
          )}
        </div>
      )}

      <CancelAppointmentModal
        appointment={cancelTarget}
        isSubmitting={isCancelling}
        error={cancelError}
        onConfirm={handleCancelConfirm}
        onClose={() => {
          if (!isCancelling) {
            setCancelTarget(null);
            setCancelError("");
          }
        }}
      />
    </div>
  );
}

export default AppointmentActionsMenu;
