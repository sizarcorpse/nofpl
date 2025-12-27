import { ApiError } from "@/utils/db";

export const createCacheKey = (...parts: (string | undefined)[]) =>
  parts.filter(Boolean).join(":");

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isMaintenanceMode" in error &&
    "message" in error &&
    typeof (error as ApiError).isMaintenanceMode === "boolean"
  );
}
