import { useEffect, useRef, useState } from "react";
import { getDoctorProfile, getSpecialties, updateDoctorProfile } from "../../api/doctor.api";
import AvailabilityEditor from "../../components/doctor/AvailabilityEditor";
import { BadgeIcon, ClockIcon, MapPinIcon } from "../../components/layout/nav-icons";
import FormField from "../auth/FormField";
import { UserIcon } from "../auth/icons";
import { WEEKDAYS } from "../../utils/weekdays";

function IconBase({ children }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const PhoneIcon = () => (
  <IconBase>
    <path d="M5 4.5h3.2l1.3 4-2 1.4a11 11 0 0 0 4.6 4.6l1.4-2 4 1.3V17a2 2 0 0 1-2.18 2A16.5 16.5 0 0 1 3 5.18 2 2 0 0 1 5 4.5Z" />
  </IconBase>
);

const MailIcon = () => (
  <IconBase>
    <rect x="3" y="5" width="18" height="14" rx="2.2" />
    <path d="m4 6.5 8 6 8-6" />
  </IconBase>
);

const CakeIcon = () => (
  <IconBase>
    <path d="M4 20.5h16v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2Z" />
    <path d="M4 16.5h16M8 12.5v-3M12 12.5v-3M16 12.5v-3M12 3.5v2M9.5 6a1.5 1.5 0 1 0 3 0c0-.8-1.5-2.5-1.5-2.5S9.5 5.2 9.5 6Z" />
  </IconBase>
);

const DropletIcon = () => (
  <IconBase>
    <path d="M12 3.5s6 6.6 6 10.8a6 6 0 1 1-12 0c0-4.2 6-10.8 6-10.8Z" />
  </IconBase>
);

const GenderIcon = () => (
  <IconBase>
    <circle cx="10" cy="14" r="5.5" />
    <path d="M18 3.5h3v3M20.8 3.7l-5 5" />
  </IconBase>
);

const CameraIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
    <circle cx="12" cy="13.5" r="3.5" />
  </svg>
);

const STATUS_STYLES = {
  working: { label: "Available", className: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400" },
  off_day: { label: "Day Off", className: "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400" },
  on_leave: { label: "On Leave", className: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400" },
};

function formatTime12(time) {
  if (!time) return "";
  const [hourRaw, minute] = time.split(":");
  const hour = Number(hourRaw);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${String(hour12).padStart(2, "0")}:${minute} ${suffix}`;
}

function formatDate(isoDate) {
  if (!isoDate) return null;
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function SectionCard({ title, action, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-slate-900 dark:text-slate-200">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">{value || "Not provided"}</p>
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return <p className="rounded-lg bg-slate-50 px-4 py-6 text-center text-sm text-slate-400 dark:bg-slate-900/50">{text}</p>;
}

function buildFormFromDoctor(doctor) {
  return {
    fullName: doctor.fullName ?? "",
    phone: doctor.phone ?? "",
    email: doctor.email ?? "",
    dateOfBirth: doctor.dateOfBirth ?? "",
    experienceYears: doctor.experienceYears ?? "",
    departmentId: doctor.specialty?.id ?? "",
    bio: doctor.bio ?? "",
    address: doctor.address ?? "",
    lat: doctor.lat ?? "",
    lng: doctor.lng ?? "",
  };
}

function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bioExpanded, setBioExpanded] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const [mode, setMode] = useState("view");
  const [specialties, setSpecialties] = useState([]);
  const [form, setForm] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [selectedDays, setSelectedDays] = useState(new Set());
  const [workingFrom, setWorkingFrom] = useState("09:00");
  const [workingTo, setWorkingTo] = useState("17:00");
  const [formErrors, setFormErrors] = useState({});
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const { data } = await getDoctorProfile();
        if (!cancelled) setDoctor(data);
      } catch {
        if (!cancelled) setError("We couldn't load your profile. Please refresh the page.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function startEdit() {
    setSaveError("");
    setFormErrors({});
    setForm(buildFormFromDoctor(doctor));
    setPhotoUrl("");
    const workingDays = (doctor.availableDays ?? []).filter((day) => !day.isOff);
    setSelectedDays(new Set(workingDays.map((day) => day.dayOfWeek)));
    const referenceSchedule = workingDays[0];
    setWorkingFrom(referenceSchedule?.from ?? "09:00");
    setWorkingTo(referenceSchedule?.to ?? "17:00");
    setMode("edit");

    if (specialties.length === 0) {
      try {
        const { data } = await getSpecialties();
        setSpecialties(data ?? []);
      } catch {
        // Department list is optional context here; the current value still shows via the select.
      }
    }
  }

  function cancelEdit() {
    setMode("view");
    setSaveError("");
    setFormErrors({});
  }

  function updateField(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  function toggleDay(dayOfWeek) {
    setSelectedDays((prev) => {
      const next = new Set(prev);
      if (next.has(dayOfWeek)) next.delete(dayOfWeek);
      else next.add(dayOfWeek);
      return next;
    });
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhotoUrl(reader.result);
    reader.readAsDataURL(file);
  }

  async function handleSave(event) {
    event.preventDefault();
    setSaveError("");

    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Name is required";
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    if (!form.departmentId) nextErrors.departmentId = "Department is required";

    if (Object.keys(nextErrors).length) {
      setFormErrors(nextErrors);
      return;
    }

    setFormErrors({});
    setIsSaving(true);

    const payload = Object.fromEntries(Object.entries(form).filter(([, value]) => value !== ""));

    try {
      const { data: updated } = await updateDoctorProfile({
        ...payload,
        ...(photoUrl ? { photoUrl } : {}),
        availableDays: WEEKDAYS.filter((day) => selectedDays.has(day.dayOfWeek)).map((day) => day.key),
        workingHours: { from: workingFrom, to: workingTo },
      });
      setDoctor(updated);
      setMode("view");
      setSuccessMessage("Profile updated.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setSaveError(err.response?.data?.message || "Unable to save your changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-sm text-slate-400">Loading your profile...</div>;
  }

  if (error || !doctor) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
        {error || "Profile not found."}
      </div>
    );
  }

  const daySchedule = doctor.availableDays?.find((day) => day.dayOfWeek === selectedDay);
  const statusInfo = STATUS_STYLES[doctor.status] ?? STATUS_STYLES.off_day;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-400">
          <span className="text-slate-500 dark:text-slate-400">Doctors</span>
          <span className="mx-1.5">›</span>
          <span className="font-medium text-slate-700 dark:text-slate-200">My Profile</span>
        </p>

        {mode === "view" && (
          <button
            type="button"
            onClick={startEdit}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      {successMessage && (
        <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-400">
          {successMessage}
        </p>
      )}

      {mode === "edit" ? (
        <form onSubmit={handleSave} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          {saveError && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">{saveError}</p>
          )}

          <div className="flex items-center gap-4">
            {photoUrl || doctor.photoUrl ? (
              <img src={photoUrl || doctor.photoUrl} alt="" className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-400">
                <UserIcon size={26} />
              </span>
            )}
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600"
              >
                <CameraIcon />
                Change Photo
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </div>
          </div>

          <FormField
            label="Name"
            placeholder="Full name"
            value={form.fullName}
            onChange={updateField("fullName")}
            error={formErrors.fullName}
            required
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Phone Number"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={updateField("phone")}
              error={formErrors.phone}
              required
            />
            <FormField
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={updateField("email")}
              error={formErrors.email}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Date of Birth" type="date" value={form.dateOfBirth ?? ""} onChange={updateField("dateOfBirth")} />
            <FormField
              label="Years of Experience"
              type="number"
              min="0"
              value={form.experienceYears}
              onChange={updateField("experienceYears")}
            />
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-400">
              Department<span className="ml-0.5 text-red-500">*</span>
            </span>
            <select
              value={form.departmentId}
              onChange={updateField("departmentId")}
              className={`w-full rounded-lg border bg-slate-50 py-2.5 px-3.5 text-[0.925rem] text-slate-900 outline-none transition focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10 dark:bg-slate-900 dark:text-slate-200 dark:focus:bg-slate-800 ${
                formErrors.departmentId ? "border-red-300 dark:border-red-900/60" : "border-slate-200 dark:border-slate-700"
              }`}
            >
              <option value="">Select department</option>
              {specialties.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
              {specialties.length === 0 && doctor.specialty && (
                <option value={doctor.specialty.id}>{doctor.specialty.name}</option>
              )}
            </select>
            {formErrors.departmentId && (
              <span className="mt-1.5 block text-xs font-medium text-red-500">{formErrors.departmentId}</span>
            )}
          </label>

          <FormField label="Bio" multiline rows={3} value={form.bio} onChange={updateField("bio")} />

          <FormField
            label="Address"
            icon={<MapPinIcon size={16} />}
            value={form.address}
            onChange={updateField("address")}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Lat" type="number" step="any" value={form.lat} onChange={updateField("lat")} />
            <FormField label="Long" type="number" step="any" value={form.lng} onChange={updateField("lng")} />
          </div>

          <div>
            <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-400">Availability</span>
            <AvailabilityEditor
              selectedDays={selectedDays}
              onToggleDay={toggleDay}
              from={workingFrom}
              to={workingTo}
              onFromChange={setWorkingFrom}
              onToChange={setWorkingTo}
              dense
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-700">
            <button
              type="button"
              onClick={cancelEdit}
              disabled={isSaving}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <div
                className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full opacity-70"
                style={{
                  background:
                    "conic-gradient(from 210deg, rgba(37,99,235,0.18), rgba(56,189,248,0.12), transparent 60%)",
                }}
              />

              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                {doctor.photoUrl ? (
                  <img
                    src={doctor.photoUrl}
                    alt={doctor.fullName}
                    className="h-20 w-20 rounded-2xl border border-slate-100 object-cover dark:border-slate-700"
                  />
                ) : (
                  <span className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-slate-300 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-500">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="3.5" />
                      <path d="M4.75 19.5a7.25 7.25 0 0 1 14.5 0" />
                    </svg>
                  </span>
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-lg font-bold text-slate-900 dark:text-slate-200">{doctor.fullName}</h1>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusInfo.className}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    {doctor.code} <span className="mx-1">•</span> {doctor.specialty?.name ?? "General Practice"}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    {doctor.qualifications} <span className="mx-1">•</span> {doctor.title}
                  </p>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                    Clinic: <span className="font-medium text-slate-800 dark:text-slate-200">{doctor.clinicName}</span>
                  </p>
                </div>
              </div>
            </section>

            <SectionCard title="Availability">
              <div className="flex flex-wrap gap-2">
                {WEEKDAYS.map((day) => {
                  const schedule = doctor.availableDays?.find((item) => item.dayOfWeek === day.dayOfWeek);
                  const isActive = selectedDay === day.dayOfWeek;
                  return (
                    <button
                      key={day.dayOfWeek}
                      type="button"
                      onClick={() => setSelectedDay(day.dayOfWeek)}
                      className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                        isActive
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600"
                      } ${schedule?.isOff && !isActive ? "text-slate-400" : ""}`}
                    >
                      {day.short}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm dark:bg-slate-900/50">
                {daySchedule?.isOff ? (
                  <span className="text-slate-400">Not working on {WEEKDAYS[selectedDay].label}.</span>
                ) : (
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {WEEKDAYS[selectedDay].label}: {formatTime12(daySchedule?.from)} - {formatTime12(daySchedule?.to)}
                  </span>
                )}
              </div>
            </SectionCard>

            <SectionCard title="Short Bio">
              <p className={`text-sm leading-relaxed text-slate-600 dark:text-slate-200 ${bioExpanded ? "" : "line-clamp-3"}`}>{doctor.bio}</p>
              {doctor.bio && doctor.bio.length > 160 && (
                <button
                  type="button"
                  onClick={() => setBioExpanded((value) => !value)}
                  className="mt-2 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                  {bioExpanded ? "See Less" : "See More"}
                </button>
              )}
            </SectionCard>

            <SectionCard title="Education Information">
              {doctor.education?.length ? (
                <ul className="space-y-4">
                  {doctor.education.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.institution}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.degree}</p>
                        <p className="text-xs text-slate-400">
                          {formatDate(item.from)} - {formatDate(item.to)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState text="No education history added yet." />
              )}
            </SectionCard>

            <SectionCard title="Awards & Recognition">
              {doctor.awards?.length ? (
                <ul className="space-y-4">
                  {doctor.awards.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {item.title} {item.year && <span className="font-normal text-slate-400">({item.year})</span>}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState text="No awards added yet." />
              )}
            </SectionCard>

            <SectionCard title="Certifications">
              {doctor.certifications?.length ? (
                <ul className="space-y-4">
                  {doctor.certifications.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {item.name} {item.year && <span className="font-normal text-slate-400">({item.year})</span>}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState text="No certifications added yet." />
              )}
            </SectionCard>
          </div>

          <aside className="space-y-6">
            <SectionCard title="About">
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                <InfoRow icon={<BadgeIcon size={16} />} label="Medical Licence Number" value={doctor.licenseNumber} />
                <InfoRow icon={<PhoneIcon />} label="Phone Number" value={doctor.phone} />
                <InfoRow icon={<MailIcon />} label="Email Address" value={doctor.email} />
                <InfoRow icon={<MapPinIcon size={16} />} label="Location" value={doctor.address} />
                <InfoRow icon={<CakeIcon />} label="Date of Birth" value={formatDate(doctor.dateOfBirth)} />
                <InfoRow icon={<DropletIcon />} label="Blood Group" value={doctor.bloodGroup} />
                <InfoRow
                  icon={<ClockIcon size={16} />}
                  label="Years of Experience"
                  value={doctor.experienceYears ? `${doctor.experienceYears}+ Years` : null}
                />
                <InfoRow
                  icon={<GenderIcon />}
                  label="Gender"
                  value={
                    doctor.gender && doctor.gender !== "unspecified"
                      ? doctor.gender.charAt(0).toUpperCase() + doctor.gender.slice(1)
                      : null
                  }
                />
              </div>
            </SectionCard>
          </aside>
        </div>
      )}
    </div>
  );
}

export default DoctorProfile;
