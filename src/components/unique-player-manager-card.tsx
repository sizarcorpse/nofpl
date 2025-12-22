import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { LeagueEntryEventHistory } from "@/utils/type";

interface ManagerCardProps {
  managers: LeagueEntryEventHistory[];
}

const UniquePlayerManagerCard = ({ managers }: ManagerCardProps) => {
  return (
    <ItemGroup className="gap-1">
      {managers.map((manager) => (
        <Item
          className="py-2 px-2"
          size="sm"
          variant="muted"
          key={manager.entry}
        >
          <ItemContent>
            <ItemTitle className="line-clamp-1 text-xs font-normal capitalize">
              #{manager.league_entry_rank} {manager.entry_name.toLowerCase()}
            </ItemTitle>
            <ItemDescription className="text-xs font-extralight capitalize leading-3">
              {manager.player_name.toLowerCase()}
            </ItemDescription>
          </ItemContent>
          <ItemContent className="flex-none text-end">
            <ItemDescription className="text-xs font-extralight capitalize leading-3">
              {manager.total_points} Points
            </ItemDescription>
            <ItemDescription className="text-xs font-extralight capitalize leading-3">
              {manager.points} GWP
            </ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  );
};

export default UniquePlayerManagerCard;
