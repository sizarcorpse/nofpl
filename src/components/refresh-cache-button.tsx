"use client";

import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useState } from "react";

const RefreshCacheButton = () => {
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/refresh", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to refresh cache");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Submit"
      onClick={handleRefresh}
    >
      <RotateCw className={loading ? "animate-spin" : ""} />
    </Button>
  );
};

export default RefreshCacheButton;
