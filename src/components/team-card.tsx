import TeamManagerCard from "@/components/team-manager-card";
import TeamPlayerCard from "@/components/team-player-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ItemGroup } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import type { Team } from "@/utils/type";

interface TeamCardProps {
  team: Team;
}

const TeamCard = (props: TeamCardProps) => {
  const {
    team: { manager, players },
  } = props;

  const lineup = players.filter((player) => player.pick.position <= 11);
  const substitutes = players.filter((player) => player.pick.position > 11);

  return (
    <Card key={manager.entry} className="relative w-full gap-2 max-w-96">
      <CardHeader className="gap-0">
        <TeamManagerCard manager={manager} />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Separator />
        <ItemGroup className="gap-1">
          {lineup.map((player) => (
            <TeamPlayerCard key={player.id} player={player} />
          ))}
        </ItemGroup>
        <Separator />
        <ItemGroup className="gap-1">
          {substitutes.map((player) => (
            <TeamPlayerCard key={player.id} player={player} />
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
