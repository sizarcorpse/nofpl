"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useQueryState } from "nuqs";

const UniquePlayerSort = () => {
  const [sort, setSort] = useQueryState("sort", {
    history: "replace",
    shallow: false,
    clearOnDefault: true,
    defaultValue: "club",
  });

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const getSortLabel = (value: string) => {
    switch (value) {
      case "element-type":
        return "Element Type";
      case "most-picked":
        return "Most Picked";
      case "club":
        return "Club";
      case "most-points":
        return "Most Points";
      case "most-captains":
        return "Most Captains";
      default:
        return "Club";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full max-w-full justify-between text-sm font-light col-span-3"
        >
          {getSortLabel(sort || "club")}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-full col-span-3">
        <DropdownMenuItem onSelect={() => handleSortChange("element-type")}>
          Element Type
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSortChange("most-picked")}>
          Most Picked
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSortChange("club")}>
          Club
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSortChange("most-points")}>
          Most Points
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSortChange("most-captains")}>
          Most Captains
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UniquePlayerSort;
