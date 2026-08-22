import { useRef, useState } from "react";
import { useDismissableMenu } from "../../hooks/useDismissableMenu";
import { BellIcon } from "../layout/nav-icons";

const NOTIFICATIONS = [
  { id: 1, text: "New appointment request from Sarah Lee", time: "10 min ago", unread: true },
  { id: 2, text: "Ahmed Khalil checked in for their visit", time: "1 hour ago", unread: true },
  { id: 3, text: "Your schedule for tomorrow was updated", time: "Yesterday", unread: false },
];

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const menuRef = useRef(null);

  const unreadCount = notifications.filter((item) => item.unread).length;

  function close() {
    setOpen(false);
  }

  useDismissableMenu(menuRef, open, close);

  function toggleOpen() {
    setOpen((value) => {
      const next = !value;
      if (next) {
        setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
      }
      return next;
    });
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={toggleOpen}
        aria-label="Notifications"
        aria-haspopup="true"
        aria-expanded={open}
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
      >
        <BellIcon size={18} />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-800" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <div className="border-b border-slate-100 px-3 py-2.5 dark:border-slate-700">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Notifications</p>
          </div>

          {notifications.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-slate-400">No notifications.</p>
          ) : (
            <ul className="max-h-72 overflow-y-auto py-1">
              {notifications.map((item) => (
                <li key={item.id} className="rounded-lg px-3 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-700">
                  <p className="text-slate-700 dark:text-slate-200">{item.text}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{item.time}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
