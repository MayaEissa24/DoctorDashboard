import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctorProfile, getSpecialties, updateDoctorProfile } from "../../api/doctor.api";
import { useAuth } from "../../auth/useAuth";
import FormField from "../auth/FormField";
import { MailIcon, MapPinIcon, UserIcon } from "../auth/icons";

const WEEKDAYS = [
  { dayOfWeek: 1, key: "monday", label: "Monday" },
  { dayOfWeek: 2, key: "tuesday", label: "Tuesday" },
  { dayOfWeek: 3, key: "wednesday", label: "Wednesday" },
  { dayOfWeek: 4, key: "thursday", label: "Thursday" },
  { dayOfWeek: 5, key: "friday", label: "Friday" },
  { dayOfWeek: 6, key: "saturday", label: "Saturday" },
  { dayOfWeek: 0, key: "sunday", label: "Sunday" },
];

function IconBase({ children }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const PhoneIcon = () => (
  <IconBase>
    <path d="M5 4.5h3.2l1.3 4-2 1.4a11 11 0 0 0 4.6 4.6l1.4-2 4 1.3V17a2 2 0 0 1-2.18 2A16.5 16.5 0 0 1 3 5.18 2 2 0 0 1 5 4.5Z" />
  </IconBase>
);

const CalendarIcon = () => (
  <IconBase>
    <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
    <path d="M3.5 9.5h17M8 3v3M16 3v3" />
  </IconBase>
);

const BriefcaseIcon = () => (
  <IconBase>
    <rect x="3" y="7.5" width="18" height="12" rx="2" />
    <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 12.5h18" />
  </IconBase>
);

const BuildingIcon = () => (
  <IconBase>
    <rect x="5" y="3.5" width="10" height="17" rx="1" />
    <rect x="15" y="9" width="4.5" height="11.5" rx="1" />
  </IconBase>
);

const CameraIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
    <circle cx="12" cy="13.5" r="3.5" />
  </svg>
);

function SectionDivider({ title }) {
  return (
    <div className="mb-4 mt-8 border-t border-slate-100 pt-6 first:mt-0 first:border-t-0 first:pt-0">
      <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">{title}</h2>
    </div>
  );
}

function CompleteProfile() {
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [specialties, setSpecialties] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    experienceYears: "",
    departmentId: "",
    bio: "",
    address: "",
    lat: "",
    lng: "",
  });
  const [photoUrl, setPhotoUrl] = useState("");
  const [selectedDays, setSelectedDays] = useState(new Set());
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [{ data: doctor }, { data: departments }] = await Promise.all([
          getDoctorProfile(),
          getSpecialties(),
        ]);
        if (cancelled) return;

        setForm({
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
        });
        setSelectedDays(
          new Set((doctor.availableDays ?? []).filter((day) => !day.isOff).map((day) => day.dayOfWeek)),
        );
        setSpecialties(departments ?? []);
      } catch {
        if (!cancelled) setFormError("We couldn't load your details. Please refresh the page.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

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

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Name is required";
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    if (!form.departmentId) nextErrors.departmentId = "Department is required";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    if (!acceptedTerms) {
      setFormError("Please confirm the Terms of Service & Privacy Policy to continue.");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const payload = Object.fromEntries(
      Object.entries(form).filter(([, value]) => value !== ""),
    );

    try {
      await updateDoctorProfile({
        ...payload,
        ...(photoUrl ? { photoUrl } : {}),
        availableDays: WEEKDAYS.filter((day) => selectedDays.has(day.dayOfWeek)).map((day) => day.key),
        hasCompletedProfile: true,
      });
      updateUser({ hasCompletedProfile: true });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const message = error.response?.data?.message;
      setFormError(message || "Unable to save your profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-sm text-slate-400">Loading...</div>;
  }

  return (
    <>
      <header className="mb-7">
        <h1 className="text-[1.7rem] font-bold text-slate-900">Complete Your Profile</h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Just a few more details to finish setting up your account.
        </p>
      </header>

      {formError && (
        <p className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
          {formError}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-6 flex items-center gap-4">
          {photoUrl ? (
            <img src={photoUrl} alt="" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <UserIcon size={26} />
            </span>
          )}
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300"
            >
              <CameraIcon />
              Upload Photo
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </div>
        </div>

        <SectionDivider title="Contact Information" />
        <div className="space-y-4">
          <FormField
            label="Name"
            icon={<UserIcon />}
            placeholder="Full name"
            value={form.fullName}
            onChange={updateField("fullName")}
            error={errors.fullName}
            required
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Phone Number"
              icon={<PhoneIcon />}
              placeholder="Enter phone number"
              value={form.phone}
              onChange={updateField("phone")}
              error={errors.phone}
              required
            />
            <FormField
              label="Email Address"
              type="email"
              icon={<MailIcon />}
              placeholder="you@example.com"
              value={form.email}
              onChange={updateField("email")}
              error={errors.email}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Date of Birth"
              type="date"
              icon={<CalendarIcon />}
              value={form.dateOfBirth ?? ""}
              onChange={updateField("dateOfBirth")}
            />
            <FormField
              label="Years of Experience"
              type="number"
              min="0"
              icon={<BriefcaseIcon />}
              placeholder="e.g. 5"
              value={form.experienceYears}
              onChange={updateField("experienceYears")}
            />
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Department<span className="ml-0.5 text-red-500">*</span>
            </span>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-3.5 flex h-5 w-5 items-center justify-center text-slate-400">
                <BuildingIcon />
              </span>
              <select
                value={form.departmentId}
                onChange={updateField("departmentId")}
                className={`w-full appearance-none rounded-lg border bg-slate-50 py-2.5 pl-10 pr-3.5 text-[0.925rem] text-slate-900 outline-none transition focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10 ${
                  errors.departmentId ? "border-red-300" : "border-slate-200"
                }`}
              >
                <option value="">Select department</option>
                {specialties.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.departmentId && (
              <span className="mt-1.5 block text-xs font-medium text-red-500">{errors.departmentId}</span>
            )}
          </label>

          <FormField
            label="Bio"
            placeholder="A short professional bio (optional)"
            value={form.bio}
            onChange={updateField("bio")}
            multiline
            rows={3}
          />
        </div>

        <SectionDivider title="Address Information" />
        <div className="space-y-4">
          <FormField
            label="Address"
            icon={<MapPinIcon />}
            placeholder="Clinic or practice address"
            value={form.address}
            onChange={updateField("address")}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Lat"
              type="number"
              step="any"
              placeholder="e.g. 40.7128"
              value={form.lat}
              onChange={updateField("lat")}
            />
            <FormField
              label="Long"
              type="number"
              step="any"
              placeholder="e.g. -74.0060"
              value={form.lng}
              onChange={updateField("lng")}
            />
          </div>
        </div>

        <SectionDivider title="Appointment Schedule" />
        <div className="flex flex-wrap gap-2">
          {WEEKDAYS.map((day) => {
            const active = selectedDays.has(day.dayOfWeek);
            return (
              <button
                key={day.key}
                type="button"
                onClick={() => toggleDay(day.dayOfWeek)}
                className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                  active
                    ? "border-[#2563eb] bg-[#2563eb] text-white"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {day.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-slate-400">Tap a day to mark it as a working day.</p>

        <label className="mt-6 flex items-start gap-2.5 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb]"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
          />
          <span>
            I agree to the <span className="font-medium text-[#2563eb]">Terms of Service</span> &{" "}
            <span className="font-medium text-[#2563eb]">Privacy Policy</span>
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-lg bg-[#2563eb] py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25 transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Complete Profile"}
        </button>
      </form>
    </>
  );
}

export default CompleteProfile;
