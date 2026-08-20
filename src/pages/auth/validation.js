export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

export function validateLoginField(field, value) {
  switch (field) {
    case "email":
      if (!value.trim()) return "Email is required";
      if (!isValidEmail(value)) return "Enter a valid email address";
      return "";
    case "password":
      if (!value) return "Password is required";
      return "";
    default:
      return "";
  }
}

export function validateRegisterField(field, value, form) {
  switch (field) {
    case "fullName":
      if (!value.trim()) return "Full name is required";
      return "";
    case "email":
      if (!value.trim()) return "Email is required";
      if (!isValidEmail(value)) return "Enter a valid email address";
      return "";
    case "password":
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      return "";
    case "confirmPassword":
      if (!value) return "Please confirm your password";
      if (value !== form.password) return "Passwords do not match";
      return "";
    case "acceptedTerms":
      if (!value) return "You must agree to the Terms of Service";
      return "";
    default:
      return "";
  }
}
