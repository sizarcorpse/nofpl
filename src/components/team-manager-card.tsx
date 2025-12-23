import type { LeagueEntryEventHistory } from "@/utils/type";

interface TeamManagerCardProps {
  manager: LeagueEntryEventHistory;
}

const TeamManagerCard = (props: TeamManagerCardProps) => {
  const { manager } = props;

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col gap-1 place-self-start">
        <span className="text-sm font-medium capitalize leading-4">
          {manager.player_name.toLowerCase()}
        </span>
        <span className="text-xs font-extralight capitalize leading-3">
          {manager.entry_name.toLowerCase()}
        </span>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span className="text-xs font-extralight capitalize leading-3">
          #{manager.league_entry_rank}
        </span>

        <span className="text-xs font-extralight capitalize leading-3">
          {manager.total_points} Points
        </span>

        <span className="text-xs font-extralight capitalize leading-3">
          {manager.points} GWP
        </span>
      </div>
    </div>
  );
};

export default TeamManagerCard;
