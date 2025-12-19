import ManagerCard from "@/components/manager-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ItemGroup } from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ELEMENT_TYPE, TEAMS } from "@/utils/data";
import type { UniquePlayerManager } from "@/utils/type";
import Image from "next/image";

interface UniquePlayerGridProps {
  players: UniquePlayerManager[];
}

const UniquePlayerGrid = async (props: UniquePlayerGridProps) => {
  const { players } = props;

  return (
    <div className="grid grid-cols-1 gap-2 content-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {players.map(({ player, associated, dropped }) => (
        <Card key={player.id} className="relative grid grid-cols-[1fr] gap-4">
          <CardHeader className="grid grid-cols-[74px_1fr] gap-x-4 gap-y-0  items-end">
            <Image
              src={`https://resources.premierleague.com/premierleague25/photos/players/110x140/${player.code}.png`}
              alt={player.web_name}
              width={73.4}
              height={93.4}
              unoptimized
            />

            <div className="grid grid-cols-[1fr_60px] ">
              <div className="flex flex-col justify-center gap-1">
                <span className="text-xs font-extralight capitalize leading-3">
                  {ELEMENT_TYPE[player.element_type]}
                </span>
                <span className="text-sm font-medium capitalize leading-4">
                  {player.first_name} {player.second_name}
                </span>
                <span
                  className="text-xs font-extralight capitalize leading-3"
                  style={{ color: TEAMS[player.team].color_code }}
                >
                  {TEAMS[player.team].name}
                </span>
              </div>

              <div className="flex flex-col items-end justify-center gap-0.5">
                <span className="text-[11px] font-extralight leading-3">
                  £{(player.now_cost / 10).toFixed(1)}
                </span>
                <span className="text-[11px] font-extralight leading-3.5">
                  {player.total_points}
                </span>
                <span className="text-[11px] font-extralight leading-3.5">
                  {player.selected_by_percent}%
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="picked" className="gap-4">
              <TabsList>
                <TabsTrigger value="picked" className="text-xs font-normal">
                  Picked{" "}
                  <Badge className="text-xs font-normal w-5 h-5">
                    {associated.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="dropped" className="text-xs font-normal">
                  Dropped{" "}
                  <Badge
                    variant="destructive"
                    className="aspect-square text-xs font-normal w-5 h-5"
                  >
                    {dropped.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="picked">
                <ScrollArea className="h-80">
                  <ItemGroup className="gap-1">
                    {associated.map((manager) => (
                      <ManagerCard key={manager.entry} manager={manager} />
                    ))}
                  </ItemGroup>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="dropped">
                <ScrollArea className="h-80">
                  <ItemGroup className="gap-1">
                    {dropped.map((manager) => (
                      <ManagerCard key={manager.entry} manager={manager} />
                    ))}
                  </ItemGroup>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UniquePlayerGrid;
