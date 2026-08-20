function Icon({ children, size = 17, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export const GridIcon = (props) => (
  <Icon {...props}>
    <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.5" />
    <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.5" />
    <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.5" />
    <rect x="13" y="13" width="7.5" height="7.5" rx="1.5" />
  </Icon>
);

export const AppsIcon = (props) => (
  <Icon {...props}>
    <rect x="4" y="4" width="16" height="6" rx="1.5" />
    <rect x="4" y="14" width="16" height="6" rx="1.5" />
  </Icon>
);

export const MonitorIcon = (props) => (
  <Icon {...props}>
    <rect x="3.5" y="4.5" width="17" height="12" rx="1.5" />
    <path d="M9 20.5h6M12 16.5v4" />
  </Icon>
);

export const LayoutIcon = (props) => (
  <Icon {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
    <path d="M3.5 9h17M9 9v11.5" />
  </Icon>
);

export const StethoscopeIcon = (props) => (
  <Icon {...props}>
    <path d="M6 3.5v6a4 4 0 0 0 8 0v-6" />
    <path d="M6 3.5h-1.5M14 3.5h1.5" />
    <path d="M18 12v1.5a6 6 0 0 1-12 0V12" />
    <circle cx="19" cy="11" r="1.75" />
  </Icon>
);

export const UsersIcon = (props) => (
  <Icon {...props}>
    <circle cx="9" cy="8" r="3" />
    <path d="M2.75 19a6.25 6.25 0 0 1 12.5 0" />
    <path d="M15.5 5.5A3 3 0 0 1 17 11.14" />
    <path d="M17.25 13.5A5.5 5.5 0 0 1 21.25 19" />
  </Icon>
);

export const CalendarIcon = (props) => (
  <Icon {...props}>
    <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
    <path d="M3.5 9.5h17M8 3v3M16 3v3" />
  </Icon>
);

export const MapPinIcon = (props) => (
  <Icon {...props}>
    <path d="M12 21s7-6.13 7-11.5a7 7 0 1 0-14 0C5 14.87 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.25" />
  </Icon>
);

export const ServicesIcon = (props) => (
  <Icon {...props}>
    <path d="M9 3.5h6l1.5 3.5H7.5z" />
    <rect x="4.5" y="7" width="15" height="13.5" rx="1.5" />
    <path d="M8.5 12h7M8.5 15.5h7" />
  </Icon>
);

export const TagIcon = (props) => (
  <Icon {...props}>
    <path d="M11.5 3.5H5A1.5 1.5 0 0 0 3.5 5v6.5a1.5 1.5 0 0 0 .44 1.06l8.5 8.5a1.5 1.5 0 0 0 2.12 0l6.5-6.5a1.5 1.5 0 0 0 0-2.12l-8.5-8.5A1.5 1.5 0 0 0 11.5 3.5Z" />
    <circle cx="8" cy="8" r="1.35" fill="currentColor" stroke="none" />
  </Icon>
);

export const BoxIcon = (props) => (
  <Icon {...props}>
    <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5Z" />
    <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" />
  </Icon>
);

export const ActivityIcon = (props) => (
  <Icon {...props}>
    <path d="M3 12h4l2-7 4 14 2-7h6" />
  </Icon>
);

export const MessageIcon = (props) => (
  <Icon {...props}>
    <path d="M4 5.5h16v11H9l-4 3.5v-3.5H4Z" />
  </Icon>
);

export const StaffIcon = (props) => (
  <Icon {...props}>
    <circle cx="8" cy="8" r="3" />
    <circle cx="17" cy="8" r="2.5" />
    <path d="M2.5 19.5a5.5 5.5 0 0 1 11 0M14.75 14.75a4.5 4.5 0 0 1 6.75 3.9" />
  </Icon>
);

export const BuildingIcon = (props) => (
  <Icon {...props}>
    <rect x="5" y="3.5" width="10" height="17" rx="1" />
    <rect x="15" y="9" width="4.5" height="11.5" rx="1" />
    <path d="M8 7.5h1M11 7.5h1M8 11h1M11 11h1M8 14.5h1M11 14.5h1" />
  </Icon>
);

export const BadgeIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="M8.5 13.75 7 21l5-2.5 5 2.5-1.5-7.25" />
  </Icon>
);

export const ClockIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Icon>
);

export const CalendarOffIcon = (props) => (
  <Icon {...props}>
    <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
    <path d="M3.5 9.5h17M8 3v3M16 3v3M7 13l6 6M13 13l-6 6" />
  </Icon>
);

export const SunIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="4.25" />
    <path d="M12 2.5v2.5M12 19v2.5M4.4 4.4l1.8 1.8M17.8 17.8l1.8 1.8M2.5 12H5M19 12h2.5M4.4 19.6l1.8-1.8M17.8 6.2l1.8-1.8" />
  </Icon>
);

export const WalletIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18" />
    <circle cx="16.5" cy="14" r="1.1" fill="currentColor" stroke="none" />
  </Icon>
);

export const ReceiptIcon = (props) => (
  <Icon {...props}>
    <path d="M6 3.5h12v17l-2.5-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 20.5Z" />
    <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" />
  </Icon>
);

export const TrendingUpIcon = (props) => (
  <Icon {...props}>
    <path d="M3.5 17 10 10.5l4 4 6.5-7.5" />
    <path d="M15 6.5h5.5V12" />
  </Icon>
);

export const FileTextIcon = (props) => (
  <Icon {...props}>
    <path d="M7 3.5h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" />
    <path d="M13.5 3.5v4.2a.8.8 0 0 0 .8.8H18M8.5 13h7M8.5 16.5h5" />
  </Icon>
);

export const CreditCardIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3 10h18M7 14.5h4" />
  </Icon>
);

export const SwapIcon = (props) => (
  <Icon {...props}>
    <path d="M4 8h13l-3-3.5M20 16H7l3 3.5" />
  </Icon>
);

export const SearchIcon = (props) => (
  <Icon {...props}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m20 20-4.35-4.35" />
  </Icon>
);

export const SparkleIcon = (props) => (
  <Icon {...props}>
    <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.5 10.4 12.2 5 10.6l5.4-1.6z" />
  </Icon>
);

export const BellIcon = (props) => (
  <Icon {...props}>
    <path d="M6 10.5a6 6 0 0 1 12 0c0 4 1.5 5.25 1.5 5.25H4.5S6 14.5 6 10.5Z" />
    <path d="M10 18.75a2 2 0 0 0 4 0" />
  </Icon>
);

export const SettingsIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V19.5a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.04H4.5a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.56-1.04 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H10.5a1.7 1.7 0 0 0 1.04-1.56V4.5a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.09a1.7 1.7 0 0 0 1.56 1.04h.09a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1.04Z" />
  </Icon>
);

export const ChevronDownIcon = (props) => (
  <Icon {...props}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const ChevronRightIcon = (props) => (
  <Icon {...props}>
    <path d="m9 6 6 6-6 6" />
  </Icon>
);

export const LogOutIcon = (props) => (
  <Icon {...props}>
    <path d="M9 21H5.5a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 5.5 3H9" />
    <path d="M16 17l5-5-5-5M21 12H9" />
  </Icon>
);
