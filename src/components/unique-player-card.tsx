import { cn } from "@/libs/shadcn/utils";
import { ELEMENT_TYPE, TEAMS } from "@/utils/data";
import { Element } from "@/utils/type";
import { Star } from "lucide-react";
import Image from "next/image";

interface UniquePlayerCardProps {
  player: Element & { is_own_picked: boolean; captain_count: number };
}

const UniquePlayerCard = (props: UniquePlayerCardProps) => {
  const { player } = props;

  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 items-end">
      <Image
        src={`https://resources.premierleague.com/premierleague25/photos/players/110x140/${player.code}.png`}
        alt={player.web_name}
        width={88}
        height={112}
        unoptimized
        className="object-cover align-top object-top rounded-md aspect-[88/112]"
      />

      <div className="flex flex-col items-stretch justify-start gap-4">
        <div className="grid grid-cols-[1fr_60px]">
          {player.is_own_picked && (
            <Star
              className={cn("absolute top-6 left-6 text-amber-500")}
              size={16}
            />
          )}

          {player.captain_count > 0 && (
            <div className="absolute top-6 right-6 w-6 h-6 text-xs rounded-full font-bold bg-amber-500 text-zinc-900 flex items-center justify-center">
              {player.captain_count}
            </div>
          )}

          <div className="flex flex-col justify-center gap-1">
            <span className="text-xs font-extralight capitalize leading-3">
              {ELEMENT_TYPE[player.element_type]}
            </span>
            <span className="text-sm font-medium capitalize leading-4">
              {player.first_name} {player.second_name}
            </span>
            <span
              className="text-xs font-extralight capitalize leading-3"
              style={{ color: TEAMS[player.team].color_code }}
            >
              {TEAMS[player.team].name}
            </span>
          </div>

          <div className="flex flex-col items-end justify-center gap-0.5">
            <span className="text-[11px] font-extralight leading-3">
              £{(player.now_cost / 10).toFixed(1)}
            </span>
            <span className="text-[11px] font-extralight leading-3.5">
              {player.total_points}
            </span>
            <span className="text-[11px] font-extralight leading-3.5">
              {player.selected_by_percent}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniquePlayerCard;
