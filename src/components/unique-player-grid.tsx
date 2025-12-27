import UniquePlayerGridCard from "@/components/unique-player-grid-card";
import type { UniquePlayer } from "@/utils/type";

interface UniquePlayerGridProps {
  players: UniquePlayer[];
}

const UniquePlayerGrid = async (props: UniquePlayerGridProps) => {
  const { players } = props;

  return (
    <div className="w-full grid grid-cols-1 gap-2 justify-items-center max-w-96 lg:grid-cols-2 lg:max-w-3xl xl:grid-cols-3 xl:max-w-6xl 2xl:grid-cols-4 2xl:max-w-384">
      {players.map((player) => (
        <UniquePlayerGridCard key={player.player.id} player={player} />
      ))}
    </div>
  );
};
export default UniquePlayerGrid;
