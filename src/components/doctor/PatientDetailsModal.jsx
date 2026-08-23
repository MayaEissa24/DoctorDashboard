import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatient } from "../../api/patient.api";
import { useToast } from "../common/useToast";

const GENDER_OPTIONS = [
  { value: "unspecified", label: "Unspecified" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-slate-700 dark:text-slate-300">{value || "—"}</p>
    </div>
  );
}

function EditInput({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-slate-400">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:bg-slate-800"
      />
    </label>
  );
}

function PatientDetailsModal({ patient, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(null);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  if (!patient) return null;

  function startEdit() {
    setForm({
      fullName: patient.fullName ?? "",
      email: patient.email ?? "",
      phone: patient.phone ?? "",
      gender: patient.gender ?? "unspecified",
      dateOfBirth: patient.dateOfBirth ?? "",
      address: patient.address ?? "",
      bloodGroup: patient.bloodGroup ?? "",
      emergencyContactName: patient.emergencyContactName ?? "",
      emergencyContactPhone: patient.emergencyContactPhone ?? "",
    });
    setIsEditing(true);
  }

  function updateField(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  const saveMutation = useMutation({
    mutationFn: () => updatePatient(patient.id, form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-patients"] });
      showToast("Patient details updated.", { type: "success" });
      setIsEditing(false);
      onClose();
    },
    onError: () => {
      showToast("Unable to save changes. Please try again.", { type: "error" });
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {isEditing ? "Edit Patient" : "Patient Details"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {!isEditing ? (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Field label="Full Name" value={patient.fullName} />
              <Field label="Gender" value={patient.gender} />
              <Field label="Email" value={patient.email} />
              <Field label="Phone" value={patient.phone} />
              <Field label="Date of Birth" value={patient.dateOfBirth} />
              <Field label="Blood Group" value={patient.bloodGroup} />
              <Field label="Address" value={patient.address} />
              <Field label="Emergency Contact" value={patient.emergencyContactName} />
              <Field label="Emergency Phone" value={patient.emergencyContactPhone} />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Close
              </button>
              <button
                type="button"
                onClick={startEdit}
                className="flex-1 rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
              >
                Edit
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <EditInput label="Full Name" value={form.fullName} onChange={updateField("fullName")} />
              <label className="block">
                <span className="mb-1 block text-xs text-slate-400">Gender</span>
                <select
                  value={form.gender}
                  onChange={updateField("gender")}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  {GENDER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <EditInput label="Email" type="email" value={form.email} onChange={updateField("email")} />
              <EditInput label="Phone" value={form.phone} onChange={updateField("phone")} />
              <EditInput label="Date of Birth" type="date" value={form.dateOfBirth} onChange={updateField("dateOfBirth")} />
              <EditInput label="Blood Group" value={form.bloodGroup} onChange={updateField("bloodGroup")} />
              <EditInput label="Address" value={form.address} onChange={updateField("address")} />
              <EditInput label="Emergency Contact" value={form.emergencyContactName} onChange={updateField("emergencyContactName")} />
              <EditInput label="Emergency Phone" value={form.emergencyContactPhone} onChange={updateField("emergencyContactPhone")} />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={saveMutation.isPending}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
                className="flex-1 rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saveMutation.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PatientDetailsModal;
