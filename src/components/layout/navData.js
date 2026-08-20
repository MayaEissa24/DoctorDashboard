import {
  ActivityIcon,
  AppsIcon,
  BadgeIcon,
  BoxIcon,
  BuildingIcon,
  CalendarIcon,
  CalendarOffIcon,
  ClockIcon,
  CreditCardIcon,
  FileTextIcon,
  GridIcon,
  LayoutIcon,
  MapPinIcon,
  MessageIcon,
  MonitorIcon,
  ReceiptIcon,
  ServicesIcon,
  StaffIcon,
  StethoscopeIcon,
  SunIcon,
  SwapIcon,
  TagIcon,
  TrendingUpIcon,
  UsersIcon,
  WalletIcon,
} from "./nav-icons";

export const MAIN_MENU = [
  { label: "Dashboard", to: "/dashboard", icon: GridIcon },
  { label: "Applications", icon: AppsIcon },
  { label: "Front End", icon: MonitorIcon },
  { label: "Layouts", icon: LayoutIcon },
];

export const CLINIC_SECTION = [
  {
    label: "Doctors",
    icon: StethoscopeIcon,
    children: [
      { label: "Doctors" },
      { label: "Doctor Details", to: "/doctors/me" },
      { label: "Add Doctor" },
      { label: "Doctor Schedule" },
    ],
  },
  { label: "Patients", to: "/patients", icon: UsersIcon },
  { label: "Appointments", to: "/appointments", icon: CalendarIcon },
  { label: "Locations", icon: MapPinIcon },
  { label: "Services", icon: ServicesIcon },
  { label: "Specializations", icon: TagIcon },
  { label: "Assets", icon: BoxIcon },
  { label: "Activities", icon: ActivityIcon },
  { label: "Messages", icon: MessageIcon },
];

export const HRM_SECTION = [
  { label: "Staffs", icon: StaffIcon },
  { label: "Departments", icon: BuildingIcon },
  { label: "Designations", icon: BadgeIcon },
  { label: "Attendance", icon: ClockIcon },
  { label: "Leaves", icon: CalendarOffIcon },
  { label: "Holidays", icon: SunIcon },
  { label: "Payroll", icon: WalletIcon },
];

export const FINANCE_SECTION = [
  { label: "Expenses", icon: ReceiptIcon },
  { label: "Income", icon: TrendingUpIcon },
  { label: "Invoices", icon: FileTextIcon },
  { label: "Payments", icon: CreditCardIcon },
  { label: "Transactions", icon: SwapIcon },
];

export const NAV_SECTIONS = [
  { title: "Main Menu", items: MAIN_MENU },
  { title: "Clinic", items: CLINIC_SECTION },
  { title: "HRM", items: HRM_SECTION },
  { title: "Finance & Accounts", items: FINANCE_SECTION },
];
