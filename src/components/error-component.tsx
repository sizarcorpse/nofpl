"use client";

import { Button } from "@/components/ui/button";
import type { ApiError } from "@/utils/db";
import { isApiError } from "@/utils/utils";
import { CloudAlert } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function ErrorDisplay({
  error,
  reset,
}: {
  error: (Error & { digest?: string }) | ApiError;
  reset: () => void;
}) {
  const apiError = isApiError(error) ? error : null;
  const isMaintenanceMode = apiError?.isMaintenanceMode ?? false;

  if (isMaintenanceMode) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CloudAlert />
          </EmptyMedia>
          <EmptyTitle className="text-base leading-4">
            {apiError?.message}
          </EmptyTitle>
          <EmptyDescription className="text-sm leading-3.5">
            The service is currently under maintenance. Please try again later.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => reset()} className="text-sm">
            Retry
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudAlert />
        </EmptyMedia>
        <EmptyTitle className="text-base leading-4">
          {apiError?.message ?? error.message}
        </EmptyTitle>
        <EmptyDescription className="text-sm leading-3.5">
          An unexpected error occurred. Please try again.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => reset()} className="text-sm">
          Retry
        </Button>
      </EmptyContent>
    </Empty>
  );
}
