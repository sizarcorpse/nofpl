import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UniquePlayerCard from "@/components/unique-player-card";
import UniquePlayerFixtures from "@/components/unique-player-fixtures";
import UniquePlayerHistory from "@/components/unique-player-history";
import UniquePlayerLive from "@/components/unique-player-live";
import UniquePlayerManagerCard from "@/components/unique-player-manager-card";
import { UniquePlayer } from "@/utils/type";

interface UniquePlayerGridCardProps {
  player: UniquePlayer;
}

const UniquePlayerGridCard = (props: UniquePlayerGridCardProps) => {
  const {
    player,
    associated,
    dropped,
    live,
    summary: { history, fixtures },
  } = props.player;

  return (
    <Card className="relative w-full gap-2 max-w-96">
      <CardHeader className="gap-0">
        <UniquePlayerCard player={player} />
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <UniquePlayerLive live={live} />
        <Separator />
        <Tabs defaultValue={"picked"} className="gap-2 w-full">
          <TabsList className="w-full rounded-md">
            <TabsTrigger value="picked" className="text-xs font-normal">
              Picked{" "}
              <Badge className="text-xs font-normal w-5 h-5 p-0">
                {associated.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="dropped" className="text-xs font-normal">
              Dropped{" "}
              <Badge
                variant="destructive"
                className="aspect-square text-xs font-normal w-5 h-5 p-0"
              >
                {dropped.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs font-normal">
              History
            </TabsTrigger>
            <TabsTrigger value="fixtures" className="text-xs font-normal">
              Fixtures
            </TabsTrigger>
          </TabsList>
          <TabsContent value="picked">
            <ScrollArea className="h-80">
              <UniquePlayerManagerCard managers={associated} />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="dropped">
            <ScrollArea className="h-80">
              <UniquePlayerManagerCard managers={dropped} />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="history">
            <ScrollArea className="h-80 whitespace-nowrap">
              <UniquePlayerHistory history={history} />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="fixtures">
            <ScrollArea className="h-80 whitespace-nowrap">
              <UniquePlayerFixtures fixtures={fixtures} />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UniquePlayerGridCard;
