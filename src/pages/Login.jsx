import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import { useAuth } from "../auth/useAuth";
import Checkbox from "../components/common/Checkbox";
import { useToast } from "../components/common/useToast";
import FormField from "./auth/FormField";
import { validateLoginField } from "./auth/validation";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "./auth/icons";

const REQUIRED_FIELDS = ["email", "password"];

function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const redirectTo = location.state?.from?.pathname ?? "/dashboard";
  const justRegistered = Boolean(location.state?.registered);
  const hasShownRegisteredToast = useRef(false);

  const [form, setForm] = useState({
    email: location.state?.email ?? "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (justRegistered && !hasShownRegisteredToast.current) {
      hasShownRegisteredToast.current = true;
      showToast("Account created! Please sign in to continue.", { type: "success" });
    }
  }, [justRegistered, showToast]);

  function updateField(field) {
    return (event) => {
      const value = field === "rememberMe" ? event.target.checked : event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));

      if (touched[field] || errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: validateLoginField(field, value) }));
      }
    };
  }

  function handleBlur(field) {
    return () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({ ...prev, [field]: validateLoginField(field, form[field]) }));
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const clientErrors = {};
    for (const field of REQUIRED_FIELDS) {
      const message = validateLoginField(field, form[field]);
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
      const { data } = await login(form);
      signIn(data);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const responseData = error.response?.data;
      const serverErrors = responseData?.errors ?? {};
      setErrors(serverErrors);
      setTouched((prev) => ({ ...prev, ...Object.fromEntries(Object.keys(serverErrors).map((field) => [field, true])) }));
      setFormError(responseData?.message || "Unable to sign in. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="text-[1.7rem] font-bold text-slate-900">Sign In</h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Please enter below details to access the dashboard
        </p>
      </header>

      {formError && (
        <p className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
          {formError}
        </p>
      )}

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Email Address"
          type="email"
          autoComplete="email"
          placeholder="Enter Email Address"
          icon={<MailIcon />}
          value={form.email}
          onChange={updateField("email")}
          onBlur={handleBlur("email")}
          error={touched.email ? errors.email : ""}
          required
        />

        <FormField
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Enter Password"
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

        <div className="flex items-center justify-between text-sm">
          <Checkbox checked={form.rememberMe} onChange={updateField("rememberMe")} className="items-center gap-2">
            Remember Me
          </Checkbox>
          <button type="button" className="font-medium text-[#2563eb] hover:underline">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-[#2563eb] py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25 transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account yet?{" "}
        <Link className="font-semibold text-[#2563eb] hover:underline" to="/register">
          Register
        </Link>
      </p>

      <p className="mt-10 text-center text-xs text-slate-400">Copyright © 2026 - Digital Hub</p>
    </>
  );
}

export default Login;
