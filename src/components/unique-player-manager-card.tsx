import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { LeagueEntry } from "@/utils/type";

interface ManagerCardProps {
  manager: LeagueEntry;
}

const UniquePlayerManagerCard = ({ manager }: ManagerCardProps) => {
  return (
    <Item className="py-2 px-2" size="sm" variant="muted">
      <ItemContent>
        <ItemTitle className="line-clamp-1 text-xs font-normal capitalize">
          #{manager.rank} {manager.entry_name.toLowerCase()}
        </ItemTitle>
        <ItemDescription className="text-xs font-extralight capitalize leading-3">
          {manager.player_name.toLowerCase()}
        </ItemDescription>
      </ItemContent>
      <ItemContent className="flex-none text-end">
        <ItemDescription className="text-xs font-extralight capitalize leading-3">
          {manager.total} Points
        </ItemDescription>
        <ItemDescription className="text-xs font-extralight capitalize leading-3">
          {manager.event_total} GWP
        </ItemDescription>
      </ItemContent>
    </Item>
  );
};

export default UniquePlayerManagerCard;
