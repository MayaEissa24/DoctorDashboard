import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth.api";
import Checkbox from "../components/common/Checkbox";
import FormField from "./auth/FormField";
import { validateRegisterField } from "./auth/validation";
import {
  CompassIcon,
  EyeIcon,
  EyeOffIcon,
  FileTextIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  UserIcon,
} from "./auth/icons";

const initialForm = {
  fullName: "",
  bio: "",
  email: "",
  address: "",
  lat: "",
  lng: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
};

const REQUIRED_FIELDS = ["fullName", "email", "password", "confirmPassword", "acceptedTerms"];

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field) {
    return (event) => {
      const value = field === "acceptedTerms" ? event.target.checked : event.target.value;
      const next = { ...form, [field]: value };
      setForm(next);

      const isCheckbox = field === "acceptedTerms";
      if (isCheckbox || touched[field] || errors[field]) {
        setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
        setErrors((prev) => ({ ...prev, [field]: validateRegisterField(field, value, next) }));
      }

      if (field === "password" && (touched.confirmPassword || errors.confirmPassword)) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validateRegisterField("confirmPassword", next.confirmPassword, next),
        }));
      }
    };
  }

  function handleBlur(field) {
    return () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({ ...prev, [field]: validateRegisterField(field, form[field], form) }));
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const clientErrors = {};
    for (const field of REQUIRED_FIELDS) {
      const message = validateRegisterField(field, form[field], form);
      if (message) clientErrors[field] = message;
    }

    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      setTouched(Object.fromEntries(REQUIRED_FIELDS.map((field) => [field, true])));
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await register(form);
      navigate("/login", {
        replace: true,
        state: { registered: true, email: form.email },
      });
    } catch (error) {
      const responseData = error.response?.data;
      const serverErrors = responseData?.errors ?? {};
      setErrors(serverErrors);
      setTouched((prev) => ({ ...prev, ...Object.fromEntries(Object.keys(serverErrors).map((field) => [field, true])) }));
      setFormError(responseData?.message || "Unable to create your account. Please review the form and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <header className="mb-7">
        <h1 className="text-[1.7rem] font-bold text-slate-900">Register</h1>
        <p className="mt-1.5 text-sm text-slate-500">Please enter your details to create account</p>
      </header>

      {formError && (
        <p className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
          {formError}
        </p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Full Name"
          autoComplete="name"
          placeholder="Maya Eissa"
          icon={<UserIcon />}
          value={form.fullName}
          onChange={updateField("fullName")}
          onBlur={handleBlur("fullName")}
          error={touched.fullName ? errors.fullName : ""}
          required
        />

        <FormField
          label="Bio"
          placeholder="A short professional bio (optional)"
          icon={<FileTextIcon />}
          value={form.bio}
          onChange={updateField("bio")}
          error={errors.bio}
          multiline
          rows={3}
        />

        <FormField
          label="Email Address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          icon={<MailIcon />}
          value={form.email}
          onChange={updateField("email")}
          onBlur={handleBlur("email")}
          error={touched.email ? errors.email : ""}
          required
        />

        <FormField
          label="Address"
          autoComplete="street-address"
          placeholder="Clinic or practice address"
          icon={<MapPinIcon />}
          value={form.address}
          onChange={updateField("address")}
          error={errors.address}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Lat"
            type="number"
            step="any"
            placeholder="e.g. 40.7128"
            icon={<CompassIcon />}
            value={form.lat}
            onChange={updateField("lat")}
            error={errors.lat}
          />
          <FormField
            label="Long"
            type="number"
            step="any"
            placeholder="e.g. -74.0060"
            icon={<CompassIcon />}
            value={form.lng}
            onChange={updateField("lng")}
            error={errors.lng}
          />
        </div>

        <FormField
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Create a password"
          icon={<LockIcon />}
          value={form.password}
          onChange={updateField("password")}
          onBlur={handleBlur("password")}
          error={touched.password ? errors.password : ""}
          required
          rightElement={
            <button
              type="button"
              className="text-slate-400 transition hover:text-slate-600"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          }
        />

        <FormField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Re-enter your password"
          icon={<LockIcon />}
          value={form.confirmPassword}
          onChange={updateField("confirmPassword")}
          onBlur={handleBlur("confirmPassword")}
          error={touched.confirmPassword ? errors.confirmPassword : ""}
          required
          rightElement={
            <button
              type="button"
              className="text-slate-400 transition hover:text-slate-600"
              onClick={() => setShowConfirmPassword((value) => !value)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          }
        />

        <div>
          <Checkbox
            checked={form.acceptedTerms}
            onChange={updateField("acceptedTerms")}
            className="items-start gap-2.5"
          >
            <span>
              I agree to the <span className="font-medium text-[#2563eb]">Terms of Service</span> &{" "}
              <span className="font-medium text-[#2563eb]">Privacy Policy</span>
              <span className="ml-0.5 text-red-500" aria-hidden="true">
                *
              </span>
            </span>
          </Checkbox>
          {errors.acceptedTerms && (
            <span className="mt-1.5 block text-xs font-medium text-red-500">{errors.acceptedTerms}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-[#2563eb] py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25 transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account yet?{" "}
        <Link className="font-semibold text-[#2563eb] hover:underline" to="/login">
          Login
        </Link>
      </p>

      <p className="mt-8 text-center text-xs text-slate-400">Copyright © 2026 - Digital Hub</p>
    </>
  );
}

export default Register;
