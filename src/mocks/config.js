export const MOCK_CONFIG = {
  namespace: "api",
  timing: 700,
  persistenceFlagKey: "dh.persist",
  persistenceDbKey: "dh.mirage.db",
  tokenPrefix: "dh",
  tokenTtlMs: 24 * 60 * 60 * 1000,
};

export function isPersistenceEnabled() {
  return globalThis.localStorage?.getItem(MOCK_CONFIG.persistenceFlagKey) === "true";
}

export function enablePersistence() {
  globalThis.localStorage?.setItem(MOCK_CONFIG.persistenceFlagKey, "true");
}

export function disablePersistence() {
  globalThis.localStorage?.removeItem(MOCK_CONFIG.persistenceFlagKey);
  globalThis.localStorage?.removeItem(MOCK_CONFIG.persistenceDbKey);
}
