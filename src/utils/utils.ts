export const createCacheKey = (...parts: (string | undefined)[]) =>
  parts.filter(Boolean).join(":");
