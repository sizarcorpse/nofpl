import TeamGrid from "@/components/team-grid";
import { getClassicLeague, getCurrentEvent } from "@/utils/db";
import { Manager } from "@/utils/type";

export default async function TeamsPage(props: PageProps<"/">) {
  const { id: currentEventId } = await getCurrentEvent();

  const {
    standings: { results: managers },
  } = (await getClassicLeague({
    leagueId: Number(186557),
    page: 1,
    newEntries: 1,
    phase: 1,
  })) as {
    standings: {
      results: Manager[];
    };
  };

  return <TeamGrid managers={managers} currentEventId={currentEventId} />;
}
