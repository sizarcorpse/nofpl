import type { Manager } from "@/utils/type";

interface TeamManagerCardProps {
  manager: Manager;
}

const TeamManagerCard = (props: TeamManagerCardProps) => {
  const { manager } = props;

  return (
    <>
      <div className="flex flex-col gap-1 place-self-start">
        <span className="text-sm font-medium capitalize leading-4">
          {manager.player_name.toLowerCase()}
        </span>
        <span className="text-xs font-extralight capitalize leading-3">
          {manager.entry_name.toLowerCase()}
        </span>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-medium capitalize leading-4">
          #{manager.rank}
        </span>

        <span className="text-xs font-extralight capitalize leading-3">
          {manager.total} Points
        </span>

        <span className="text-xs font-extralight capitalize leading-3">
          {manager.event_total} GWP
        </span>
      </div>
    </>
  );
};

export default TeamManagerCard;
