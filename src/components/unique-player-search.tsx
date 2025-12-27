"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { useQueryState } from "nuqs";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

const UniquePlayerSearch = () => {
  const [search, setSearch] = useQueryState("search", {
    history: "replace",
    shallow: false,
    clearOnDefault: true,
    defaultValue: "",
  });
  const [value, setValue] = useState<string>(search ?? "");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="w-full col-span-5">
      <InputGroup>
        <InputGroupInput
          value={value}
          onChange={handleSearchChange}
          placeholder="Victor Gyökeres "
          aria-label="Search players"
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default UniquePlayerSearch;
