import TeamCard from "@/components/team-card";
import type { Team } from "@/utils/type";

interface TeamGridProps {
  teams: Team[];
}

const TeamGrid = async (props: TeamGridProps) => {
  const { teams } = props;

  return (
    <div
      id="teams"
      className="w-full grid grid-cols-1 gap-2 justify-items-center max-w-96 pt-32 lg:pt-20 lg:grid-cols-2 lg:max-w-3xl xl:grid-cols-3 xl:max-w-6xl 2xl:grid-cols-4 2xl:max-w-384"
    >
      {teams.map((team, index) => (
        <TeamCard key={index} team={team} />
      ))}
    </div>
  );
};

export default TeamGrid;
