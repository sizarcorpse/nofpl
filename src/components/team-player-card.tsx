import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item, ItemContent, ItemMedia } from "@/components/ui/item";
import { cn } from "@/libs/shadcn/utils";
import { ELEMENT_TYPE, TEAMS } from "@/utils/data";
import type { TeamPlayer } from "@/utils/type";
import Image from "next/image";

interface TeamCardProps {
  player: TeamPlayer;
}

const TeamPlayerCard = (props: TeamCardProps) => {
  const { player } = props;

  const image = `https://resources.premierleague.com/premierleague25/photos/players/110x140/${player.code}.png`;
  return (
    <Item className="py-2 px-2" size="sm" variant="muted">
      <ItemMedia>
        <Avatar
          className={cn(
            "size-10",
            player.pick.is_captain && "ring-3 ring-yellow-400",
            player.pick.is_vice_captain && "ring-3 ring-gray-400"
          )}
        >
          <AvatarImage asChild src={image}>
            <Image
              src={image}
              alt={player.web_name}
              width={40}
              height={40}
              unoptimized
              className="object-cover align-top object-top aspect-square"
            />
          </AvatarImage>
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <span className="text-xs font-extralight capitalize leading-3">
          {ELEMENT_TYPE[player.element_type]}
        </span>
        <span className="text-sm font-normal capitalize leading-3.5">
          {player.first_name} {player.second_name}
        </span>
        <span
          className="text-xs font-extralight capitalize leading-3"
          style={{ color: TEAMS[player.team].color_code }}
        >
          {TEAMS[player.team].name}
        </span>
      </ItemContent>
      <ItemContent className="flex-none text-end">
        <span className="text-xs font-extralight capitalize leading-3">
          £{(player.now_cost / 10).toFixed(1)}
        </span>
        <span className="text-xs font-extralight capitalize leading-3">
          {player.total_points}
        </span>
        <span className="text-xs font-extralight capitalize leading-3">
          {player.selected_by_percent}%
        </span>
      </ItemContent>
    </Item>
  );
};

export default TeamPlayerCard;
