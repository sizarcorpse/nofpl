import { cn } from "@/libs/shadcn/utils";
import { LiveElementStats } from "@/utils/type";

interface UniquePlayerLiveProps {
  live: LiveElementStats;
}

import {
  Clock,
  Handshake,
  Shield,
  ShieldCheck,
  Star,
  Target,
  Trophy,
} from "lucide-react";

const columns = [
  { id: "minutes", title: "Minutes Played", icon: Clock },
  { id: "total_points", title: "Points", icon: Trophy },
  { id: "goals_scored", title: "Goals Scored", icon: Target },
  { id: "assists", title: "Assists", icon: Handshake },
  { id: "bonus", title: "Bonus", icon: Star },
  {
    id: "clean_sheets",
    title: "Clean Sheets",
    icon: Shield,
  },
  {
    id: "defensive_contribution",
    title: "Defensive Contribution",
    icon: ShieldCheck,
  },
];

const UniquePlayerLive = (props: UniquePlayerLiveProps) => {
  const { live } = props;
  return (
    <div className="grid grid-cols-7 bg-secondary px-2 py-3 rounded-md h-9">
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex items-center justify-center gap-2"
          title={column.title}
        >
          <column.icon
            size={14}
            strokeWidth={1.5}
            className="text-foreground/80"
          />
          <span
            className={cn(
              "text-xs font-extralight leading-3 text-foreground/70",
              column.id === "minutes" && live.starts === 0 && "overline"
            )}
          >
            {live[column.id as keyof LiveElementStats]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default UniquePlayerLive;
