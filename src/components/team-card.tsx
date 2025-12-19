import TeamManagerCard from "@/components/team-manager-card";
import TeamPlayerCard from "@/components/team-player-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ItemGroup } from "@/components/ui/item";
import type { Player, Team } from "@/utils/type";

interface TeamCardProps {
  team: Team;
}

const TeamCard = (props: TeamCardProps) => {
  const {
    team: { manager, players },
  } = props;

  return (
    <Card key={manager.entry} className="relative grid grid-cols-[1fr] gap-2">
      <CardHeader className="grid grid-cols-[1fr_100px] items-center gap-2">
        <TeamManagerCard manager={manager} />
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-1">
          {players.map((player: Player) => (
            <TeamPlayerCard key={player.id} player={player} />
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
