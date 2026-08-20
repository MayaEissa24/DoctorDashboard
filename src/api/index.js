/**
 * Student API layer.
 *
 * Import from `src/api` in your pages and hooks.
 * Do not import from `src/mocks`.
 */
export { default as api, clearSession, getAccessToken, getStoredUser, isAuthenticated, setSession, withSimulatedError } from "./axios";

export * from "./auth.api";
export * from "./doctor.api";
export * from "./patient.api";
export * from "./appointment.api";
export * from "./dashboard.api";
export * from "./training.api";
