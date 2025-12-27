"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/libs/shadcn/utils";
import { TEAMS } from "@/utils/data";
import { useQueryState } from "nuqs";
import { useCallback, useState } from "react";

const UniquePlayerFilterClub = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useQueryState("club", {
    history: "replace",
    shallow: false,
    clearOnDefault: true,
    defaultValue: "",
  });

  const handleFilterChange = useCallback(
    (value: string) => {
      setFilter(value);
    },
    [setFilter]
  );

  const handleClearFilter = useCallback(() => {
    setFilter("");
    setOpen(false);
  }, [setFilter]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="p-0">
        <Button
          variant="outline"
          className={cn(
            "px-2 has-[>svg]:px-2 h-9 w-9 flex items-center justify-center gap-2",
            filter && "px-2 w-max items-center justify-center gap-2"
          )}
        >
          <SoccerBallIcon />
          {filter && TEAMS[parseInt(filter)].name}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[12.5rem] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search club..." />
          <CommandList>
            <CommandEmpty>No club found.</CommandEmpty>

            <CommandGroup>
              {Object.entries(TEAMS).map(([key, team]) => (
                <CommandItem
                  key={key}
                  onSelect={() => handleFilterChange(key)}
                  className={cn(
                    "hover:bg-secondary/30",
                    filter === key && "bg-secondary/80"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: team.color_code }}
                    ></span>
                    <span className="text-sm font-light">{team.name}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => handleClearFilter()}
                className={cn(
                  "hover:bg-secondary/30",
                  filter === "" && "bg-secondary/80"
                )}
              >
                <span className="text-sm font-light">All Clubs</span>
              </CommandItem>
            </CommandGroup>
          </>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const SoccerBallIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-soccer-ball-icon lucide-soccer-ball"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M11.9 6.7s-3 1.3-5 3.6c0 0 0 3.6 1.9 5.9 0 0 3.1.7 6.2 0 0 0 1.9-2.3 1.9-5.9 0 .1-2-2.3-5-3.6" />
    <path d="M11.9 6.7V2" />
    <path d="M16.9 10.4s3-1.4 4.5-1.6" />
    <path d="M15 16.3s1.9 2.7 2.9 3.7" />
    <path d="M8.8 16.3S6.9 19 6 20" />
    <path d="M2.6 8.7C4 9 7 10.4 7 10.4" />
  </svg>
);

export default UniquePlayerFilterClub;
