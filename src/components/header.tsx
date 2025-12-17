"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";

const Header = () => {
  const [sort, setSort] = useQueryState("sort", {
    history: "replace",
    shallow: false,
    clearOnDefault: false,
    defaultValue: "club",
  });

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  return (
    <div className="flex items-center justify-end w-full">
      <Select value={sort || "club"} onValueChange={handleSortChange}>
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="element-type">Element Type</SelectItem>
          <SelectItem value="most-picked">Most Picked</SelectItem>
          <SelectItem value="club">Club</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Header;
