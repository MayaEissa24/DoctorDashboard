function LogoutConfirmModal({ open, onConfirm, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-200">Log out?</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Are you sure you want to log out? You'll need to sign in again to access the Doctor Portal.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmModal;
