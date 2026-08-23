import { useCallback, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ToastContext } from "./ToastContext";
import Toast from "./Toast";

const DEFAULT_DURATION = 4000;
const EXIT_DURATION = 250;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.map((toast) => (toast.id === id ? { ...toast, leaving: true } : toast)));

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, EXIT_DURATION);

    const timer = timers.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message, { type = "success", duration = DEFAULT_DURATION } = {}) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type, leaving: false }]);

      const timer = window.setTimeout(() => dismissToast(id), duration);
      timers.current.set(id, timer);

      return id;
    },
    [dismissToast],
  );

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2.5">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              leaving={toast.leaving}
              onDismiss={() => dismissToast(toast.id)}
            />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}
