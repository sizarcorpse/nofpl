import TeamCard from "@/components/team-card";
import { getPlayers } from "@/utils/db";
import type { Managers } from "@/utils/type";

interface TeamGridProps {
  managers: Managers;
  currentEventId: number;
}

const TeamGrid = async (props: TeamGridProps) => {
  const { managers, currentEventId } = props;

  const teams = await getPlayers({
    currentEventId,
    managers,
  });

  return (
    <div className="grid grid-cols-1 gap-2 content-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {teams.map((team) => (
        <TeamCard key={team.manager.entry} team={team} />
      ))}
    </div>
  );
};

export default TeamGrid;
