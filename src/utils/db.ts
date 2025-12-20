import { unstable_cache as cache } from "@/libs/next/unstable-cache";
import { API_ENDPOINTS } from "@/utils/data";
import type { SearchParams } from "@/utils/parser";
import {
  Manager,
  Managers,
  Player,
  Teams,
  UniquePlayerManager,
} from "@/utils/type";
import { createCacheKey } from "@/utils/utils";

export async function getBootstrap() {
  let hit = false;
  return await cache(
    async () => {
      const response = await fetch(`${API_ENDPOINTS}/bootstrap-static/`);

      hit = true;

      if (!response.ok) {
        throw new Error("Failed to fetch bootstrap data");
      }

      console.log(`[cache] bootstrap-static hit: ${hit}`);
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
  let hit = false;

  return await cache(
    async () => {
      const response = await fetch(
        `${API_ENDPOINTS}/entry/${entryId}/event/${eventId}/picks`
      );

      hit = true;

      if (!response.ok) {
        throw new Error("Failed to fetch entry picks data");
      }

      console.log(`[cache] entryPicks ${entryId}-${eventId} hit: ${hit}`);

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
  let hit = false;

  return await cache(
    async () => {
      const response = await fetch(
        `${API_ENDPOINTS}/leagues-classic/${leagueId}/standings/?page_new_entries=${newEntries}&page_standings=${page}&phase=${phase}`
      );

      hit = true;

      if (!response.ok) {
        throw new Error("Failed to fetch classic league");
      }

      console.log(
        `[cache] classic-league ${leagueId}-${page}-${newEntries}-${phase} hit: ${hit}`
      );

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

export async function getUniquePlayers({
  currentEventId,
  managers,
  params,
}: {
  currentEventId: number;
  managers: Managers;
  params: SearchParams;
}) {
  const OWN_ENTRY_ID = 2937637;
  try {
    const picksPromises = managers.map((manager: Manager) =>
      getEntryPicks({
        entryId: manager.entry,
        eventId: currentEventId,
      })
    );

    const picksResults = await Promise.all(picksPromises);

    const playerIds = picksResults.flatMap((result) =>
      result.picks.map((pick: { element: number }) => pick.element)
    );

    const playerIdMap = Array.from(new Set(playerIds)).sort((a, b) => a - b);
    const players = await getElements({ elementIds: playerIdMap });
    const playersMap = new Map(players.map((el: Player) => [el.id, el]));

    let result: UniquePlayerManager[] = playerIdMap
      .map((playerId) => {
        const player = playersMap.get(playerId);

        if (!player) return null;

        const isOwnPicked = picksResults
          .map((res, idx) =>
            res.picks.some(
              (pick: { element: number }) => pick.element === playerId
            )
              ? managers[idx].entry === OWN_ENTRY_ID
              : false
          )
          .some((picked) => picked);
        const playerWithFlag = { ...player, is_own_picked: isOwnPicked };

        const associated = picksResults
          .map((res, idx) =>
            res.picks.some(
              (pick: { element: number }) => pick.element === playerId
            )
              ? managers[idx]
              : null
          )
          .filter((m): m is Manager => m !== null)
          .sort((a, b) => a.entry - b.entry);

        const dropped = managers
          .filter((m) => !associated.some((a) => a.entry === m.entry))
          .sort((a, b) => a.entry - b.entry);

        return { player: playerWithFlag, associated, dropped };
      })
      .filter((item): item is UniquePlayerManager => item !== null);

    if (params.search && params.search.trim() !== "") {
      const searchTerm = params.search.toLowerCase().trim();

      result = result.filter(({ player }) => {
        const fullName =
          `${player.first_name} ${player.second_name}`.toLowerCase();
        const webName = player.web_name.toLowerCase();

        return fullName.includes(searchTerm) || webName.includes(searchTerm);
      });
    }

    if (params.filter === "own-picked") {
      result = result.filter(({ player }) => player.is_own_picked);
    }

    if (params.sort === "element-type") {
      result = result.sort(
        (a, b) =>
          a.player.element_type - b.player.element_type ||
          a.player.id - b.player.id
      );
    } else if (params.sort === "most-picked") {
      result = result.sort(
        (a, b) =>
          b.associated.length - a.associated.length || a.player.id - b.player.id
      );
    } else if (params.sort === "club") {
      result = result.sort(
        (a, b) => a.player.team - b.player.team || a.player.id - b.player.id
      );
    } else if (params.sort === "own-picked") {
      result = result.sort(
        (a, b) =>
          Number(b.player.is_own_picked) - Number(a.player.is_own_picked) ||
          a.player.id - b.player.id
      );
    } else {
      result = result.sort((a, b) => a.player.id - b.player.id);
    }

    return result;
  } catch (error) {
    throw new Error(`Failed to get unique players data: ${error}`);
  }
}
export async function getPlayers({
  currentEventId,
  managers,
}: {
  currentEventId: number;
  managers: Managers;
}) {
  try {
    const picksPromises = managers.map((manager: Manager) =>
      getEntryPicks({
        entryId: manager.entry,
        eventId: currentEventId,
      })
    );

    const picksResults = await Promise.all(picksPromises);

    const playerIds = picksResults.flatMap((result) =>
      result.picks.map((pick: { element: number }) => pick.element)
    );

    const playerIdMap = Array.from(new Set(playerIds)).sort((a, b) => a - b);
    const players = await getElements({ elementIds: playerIdMap });
    const playersMap = new Map(players.map((el: Player) => [el.id, el]));

    const result: Teams = managers.map((manager: Manager, index: number) => {
      const picks = picksResults[index].picks;

      const players = picks
        .map((pick: { element: number }) => playersMap.get(pick.element))
        .filter(Boolean) as Player[];

      return {
        manager: manager,
        players: players,
      };
    });

    return result;
  } catch (error) {
    throw new Error(`Failed to get unique players data: ${error}`);
  }
}
