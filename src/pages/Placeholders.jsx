function PlaceholderPage({ title }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
    </div>
  );
}

export function Patients() {
  return <PlaceholderPage title="Patients" />;
}

export function Appointments() {
  return <PlaceholderPage title="Appointments" />;
}

export function Settings() {
  return <PlaceholderPage title="Settings" />;
}
