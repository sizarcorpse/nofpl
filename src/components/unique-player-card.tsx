import { cn } from "@/libs/shadcn/utils";
import { ELEMENT_TYPE, TEAMS } from "@/utils/data";
import { Player } from "@/utils/type";
import { Star } from "lucide-react";
import Image from "next/image";

interface UniquePlayerCardProps {
  player: Player;
}

const UniquePlayerCard = (props: UniquePlayerCardProps) => {
  const { player } = props;

  return (
    <>
      <Image
        src={`https://resources.premierleague.com/premierleague25/photos/players/110x140/${player.code}.png`}
        alt={player.web_name}
        width={73.4}
        height={93.4}
        unoptimized
      />

      <div className="grid grid-cols-[1fr_60px]">
        <Star
          className={cn(
            "absolute top-6 right-6",
            player.is_own_picked ? "text-amber-500" : "hidden"
          )}
          size={16}
          color={player.is_own_picked ? "#fbbf24" : "#9ca3af"}
        />
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
    </>
  );
};

export default UniquePlayerCard;
