import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ItemGroup } from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UniquePlayerCard from "@/components/unique-player-card";
import UniquePlayerManagerCard from "@/components/unique-player-manager-card";
import type { UniquePlayer } from "@/utils/type";

interface UniquePlayerGridProps {
  players: UniquePlayer[];
}

const UniquePlayerGrid = async (props: UniquePlayerGridProps) => {
  const { players } = props;
  return (
    <div className="grid grid-cols-1 gap-2 content-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {players.map(({ player, associated, dropped, live }) => (
        <Card
          key={player.id}
          className="relative grid grid-cols-[1fr] gap-4 py-4 sm:py-6"
        >
          <CardHeader className="grid grid-cols-[74px_1fr] gap-x-4 gap-y-0 items-end px-4 sm:px-6">
            <UniquePlayerCard player={player} />
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
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
                      <UniquePlayerManagerCard
                        key={manager.entry}
                        manager={manager}
                      />
                    ))}
                  </ItemGroup>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="dropped">
                <ScrollArea className="h-80">
                  <ItemGroup className="gap-1">
                    {dropped.map((manager) => (
                      <UniquePlayerManagerCard
                        key={manager.entry}
                        manager={manager}
                      />
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
