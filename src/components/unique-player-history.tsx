import { ElementSummaryFixture } from "@/utils/type";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Calendar,
  Clock,
  Flag,
  Handshake,
  Shield,
  ShieldCheck,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import Image from "next/image";

interface UniquePlayerHistoryProps {
  history: ElementSummaryFixture[];
}

import { cn } from "@/libs/shadcn/utils";
import { TEAMS } from "@/utils/data";

const columns = [
  { title: "Gameweek", icon: Calendar },
  { title: "Team", icon: Flag },
  { title: "Minutes Played", icon: Clock },
  { title: "Points", icon: Trophy },
  { title: "Goals Scored", icon: Target },
  { title: "Assists", icon: Handshake },
  { title: "Bonus", icon: Star },
  { title: "BPS", icon: BarChart },
  { title: "Clean Sheets", icon: Shield },
  { title: "Defensive Contribution", icon: ShieldCheck },
];

const UniquePlayerHistory = (props: UniquePlayerHistoryProps) => {
  return (
    <div className="flex w-full overflow-auto">
      <Table className="max-w-full">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.title} title={column.title}>
                <span className="flex justify-center stroke-0">
                  <column.icon
                    size={14}
                    strokeWidth={1.5}
                    className="text-foreground/80"
                  />
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {props.history.map((h) => {
            const gd = h.was_home
              ? h.team_h_score - h.team_a_score
              : h.team_a_score - h.team_h_score;
            const w = gd > 0;
            const d = gd === 0;
            const l = gd < 0;
            const team = TEAMS[h.opponent_team];
            const title = w
              ? `Win ${gd}-${gd === 1 ? "0" : gd - 1}`
              : d
              ? "Draw"
              : `Loss ${gd === -1 ? "0" : gd + 1}-${-gd}`;

            return (
              <TableRow key={h.fixture}>
                <TableCell className="text-xs" title={title}>
                  <span
                    className={cn(
                      h.was_home ? "" : "underline",
                      w && " text-emerald-500",
                      l && " text-red-500",
                      d && "text-muted-foreground"
                    )}
                  >
                    {h.round}
                  </span>
                </TableCell>
                <TableCell className="text-xs">
                  <Image
                    src={`https://resources.premierleague.com/premierleague25/badges-alt/${team.code}.svg`}
                    alt={TEAMS[h.opponent_team].name}
                    width={16}
                    height={16}
                    className="aspect-square object-contain"
                    unoptimized
                  />
                </TableCell>
                <TableCell
                  className={cn(
                    "text-xs font-light text-center text-foreground/80",
                    !h.starts ? "overline" : ""
                  )}
                >
                  {h.minutes}
                </TableCell>
                <TableCell className="text-xs font-light text-center text-foreground/80">
                  {h.total_points}
                </TableCell>
                <TableCell className="text-xs font-light text-center text-foreground/80">
                  {h.goals_scored}
                </TableCell>
                <TableCell className="text-xs font-light text-center text-foreground/80">
                  {h.assists}
                </TableCell>
                <TableCell className="text-xs font-light text-center text-foreground/80">
                  {h.bonus}
                </TableCell>
                <TableCell className="text-xs font-light text-center text-foreground/80">
                  {h.bps}
                </TableCell>
                <TableCell className="text-xs font-light text-center text-foreground/80">
                  {h.clean_sheets}
                </TableCell>
                <TableCell className="text-xs font-light text-center text-foreground/80">
                  {h.defensive_contribution}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="rounded-bl-md"></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-xs font-normal text-center">
              {props.history.reduce((acc, h) => acc + h.minutes, 0)}
            </TableCell>
            <TableCell className="text-xs font-normal text-center">
              {props.history.reduce((acc, h) => acc + h.total_points, 0)}
            </TableCell>
            <TableCell className="text-xs font-normal text-center">
              {props.history.reduce((acc, h) => acc + h.goals_scored, 0)}
            </TableCell>
            <TableCell className="text-xs font-normal text-center">
              {props.history.reduce((acc, h) => acc + h.assists, 0)}
            </TableCell>
            <TableCell className="text-xs font-normal text-center">
              {props.history.reduce((acc, h) => acc + h.bonus, 0)}
            </TableCell>
            <TableCell className="text-xs font-normal text-center">
              {props.history.reduce((acc, h) => acc + h.bps, 0)}
            </TableCell>
            <TableCell className="text-xs font-normal text-center">
              {props.history.reduce((acc, h) => acc + h.clean_sheets, 0)}
            </TableCell>
            <TableCell className="text-xs font-normal text-center rounded-br-md">
              {props.history.reduce(
                (acc, h) => acc + h.defensive_contribution,
                0
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default UniquePlayerHistory;
