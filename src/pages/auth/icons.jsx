function Icon({ children, size = 18 }) {
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
    >
      {children}
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 6.5 8 6 8-6" />
    </Icon>
  );
}

export function LockIcon(props) {
  return (
    <Icon {...props}>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.2" />
      <path d="M7.5 10.5V7.75a4.5 4.5 0 0 1 9 0v2.75" />
    </Icon>
  );
}

export function UserIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.75 19.5a7.25 7.25 0 0 1 14.5 0" />
    </Icon>
  );
}

export function EyeIcon(props) {
  return (
    <Icon {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.75" />
    </Icon>
  );
}

export function EyeOffIcon(props) {
  return (
    <Icon {...props}>
      <path d="M3.5 3.5l17 17" />
      <path d="M10.6 5.72A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a15.6 15.6 0 0 1-3.44 4.24M6.5 6.98C4.02 8.6 2.5 12 2.5 12s3.5 6.5 9.5 6.5a9.5 9.5 0 0 0 3.24-.58" />
      <path d="M9.9 10.4a2.75 2.75 0 0 0 3.7 3.7" />
    </Icon>
  );
}

export function MapPinIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 21s7-6.13 7-11.5a7 7 0 1 0-14 0C5 14.87 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.25" />
    </Icon>
  );
}

export function FileTextIcon(props) {
  return (
    <Icon {...props}>
      <path d="M7 3.5h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" />
      <path d="M13.5 3.5v4.2a.8.8 0 0 0 .8.8H18M8.5 13h7M8.5 16.5h5" />
    </Icon>
  );
}

export function CompassIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="m14.8 9.2-1.8 5.4-5.4 1.8 1.8-5.4z" />
    </Icon>
  );
}
