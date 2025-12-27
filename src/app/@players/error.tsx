"use client";
import { ErrorDisplay } from "@/components/error-component";
import type { ApiError } from "@/utils/db";

export default function PlayerError({
  error,
  reset,
}: {
  error: (Error & { digest?: string }) | ApiError;
  reset: () => void;
}) {
  return <ErrorDisplay error={error} reset={reset} />;
}
