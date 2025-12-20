"use client";

import { Toggle } from "@/components/ui/toggle";
import { Star } from "lucide-react";
import { useQueryState } from "nuqs";

const UniquePlayerFilter = () => {
  const [filter, setFilter] = useQueryState("filter", {
    history: "replace",
    shallow: false,
    clearOnDefault: true,
    defaultValue: "",
  });

  const handleFilterChange = (checked: boolean) => {
    setFilter(checked ? "own-picked" : "");
  };

  return (
    <Toggle
      aria-label="Toggle bookmark"
      variant="outline"
      className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-amber-500 data-[state=on]:*:[svg]:stroke-amber-500"
      pressed={filter === "own-picked"}
      onPressedChange={handleFilterChange}
    >
      <Star />
    </Toggle>
  );
};

export default UniquePlayerFilter;
