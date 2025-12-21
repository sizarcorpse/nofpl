"use client";
import { Button } from "@/components/ui/button";

export default function PlayerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const getErrorMessage = () => {
    if (error.digest) {
      return `Error: ${error.message} (Digest: ${error.digest})`;
    }
  };

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{getErrorMessage()}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
