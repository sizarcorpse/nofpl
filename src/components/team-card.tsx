import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ItemGroup } from "@/components/ui/item";
import { ELEMENT_TYPE, TEAMS } from "@/utils/data";
import type { Player, Team } from "@/utils/type";
import Image from "next/image";
import PlayerCard from "./player-card";

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
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-1">
          {players.map((player: Player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
