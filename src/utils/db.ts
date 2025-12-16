import { unstable_cache as cache } from "@/libs/next/unstable-cache";
import { API_ENDPOINTS } from "@/utils/data";
import { createCacheKey } from "@/utils/utils";

export async function getBootstrap() {
  return await cache(
    async () => {
      const response = await fetch(`${API_ENDPOINTS}/bootstrap-static/`);

      if (!response.ok) {
        throw new Error("Failed to fetch bootstrap data");
      }
      return await response.json();
    },
    [JSON.stringify("bootstrap")],
    {}
  )();
}

export async function getEntryPicks({
  entryId,
  eventId,
}: {
  entryId: number;
  eventId: number;
}) {
  return await cache(
    async () => {
      const response = await fetch(
        `${API_ENDPOINTS}/entry/${entryId}/event/${eventId}/picks`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch entry picks data");
      }

      return await response.json();
    },
    [JSON.stringify(["entryPicks", entryId, eventId])],
    {
      revalidate: 60 * 60 * 2,
      tags: [
        createCacheKey(
          "picks",
          entryId.toString(),
          "event",
          eventId.toString()
        ),
      ],
    }
  )();
}

export async function getCurrentEvent() {
  try {
    const bootstrap = await getBootstrap();

    if (!bootstrap) {
      throw new Error("Bootstrap data is undefined");
    }

    const currentEvent = bootstrap.events.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (event: any) => event.is_current
    );

    if (!currentEvent) {
      throw new Error("No current event found");
    }

    return currentEvent;
  } catch (error) {
    throw new Error(`Failed to get current event: ${error}`);
  }
}

export async function getElements({ elementIds }: { elementIds: number[] }) {
  try {
    const bootstrap = await getBootstrap();

    if (!bootstrap) {
      throw new Error("No bootstrap data available");
    }

    if (!bootstrap.elements || !Array.isArray(bootstrap.elements)) {
      return [];
    }

    const elements = bootstrap.elements;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return elements.filter((element: any) => elementIds.includes(element.id));
  } catch (error) {
    throw new Error(`Failed to get elements data: ${error}`);
  }
}

export async function getClassicLeague({
  leagueId,
  page,
  newEntries,
  phase,
}: {
  leagueId: number;
  page: number;
  newEntries: number;
  phase: number;
}) {
  return await cache(
    async () => {
      const response = await fetch(
        `${API_ENDPOINTS}/leagues-classic/${leagueId}/standings/?page_new_entries=${newEntries}&page_standings=${page}&phase=${phase}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch classic league");
      }

      return await response.json();
    },
    [
      JSON.stringify({
        "classic-league": { leagueId, page, newEntries, phase },
      }),
    ],
    {
      revalidate: 60 * 60 * 2,
      tags: [
        createCacheKey(
          "league",
          leagueId.toString(),
          page.toString(),
          phase.toString()
        ),
      ],
    }
  )();
}
