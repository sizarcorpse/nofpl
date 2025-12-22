import { Item, ItemContent, ItemGroup } from "@/components/ui/item";
import { cn } from "@/libs/shadcn/utils";
import { TEAMS } from "@/utils/data";
import { ElementSummaryUpcomingFixture } from "@/utils/type";

interface UniquePlayerFixturesProps {
  fixtures: ElementSummaryUpcomingFixture[];
}

const UniquePlayerFixtures = (props: UniquePlayerFixturesProps) => {
  const { fixtures } = props;

  return (
    <ItemGroup className="gap-2">
      {fixtures.map((fixture) => {
        const opponent = fixture.is_home ? fixture.team_a : fixture.team_h;
        const difficultyColor =
          fixture.difficulty === 5
            ? "bg-red-800"
            : fixture.difficulty === 4
            ? "bg-red-500"
            : fixture.difficulty === 3
            ? "bg-slate-200 text-background"
            : fixture.difficulty === 2
            ? "bg-emerald-600"
            : "bg-emerald-600";

        return (
          <Item
            key={fixture.id}
            className={cn(difficultyColor, "py-2 px-2")}
            size="sm"
          >
            <ItemContent>
              <span className="text-sm font-normal capitalize leading-3.5">
                {TEAMS[opponent].name} {fixture.is_home ? "(H)" : "(A)"}
              </span>
            </ItemContent>

            <ItemContent className="flex-none text-end">
              <span className="text-xs font-normal capitalize leading-3.5">
                GW {fixture.event}
              </span>
              <span className="text-xs font-extralight capitalize leading-3">
                {new Date(fixture.kickoff_time).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </span>
            </ItemContent>
          </Item>
        );
      })}
    </ItemGroup>
  );
};

export default UniquePlayerFixtures;
