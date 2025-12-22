import { unstable_cache as cache } from "@/libs/next/unstable-cache";
import { API_ENDPOINTS } from "@/utils/data";
import type { SearchParams } from "@/utils/parser";
import {
  Bootstrap,
  ClassicLeague,
  ElementSummary,
  ElementSummaryFixture,
  ElementSummaryUpcomingFixture,
  EntryEvent,
  Event,
  LeagueEntry,
  Live,
  LiveElement,
  UniquePlayer,
} from "@/utils/type";
import { createCacheKey } from "@/utils/utils";
import { revalidateTag } from "next/cache";

export async function refreshCacheTag() {
  try {
    revalidateTag("refresh-on-demand", "max");

    console.debug("Revalidated tag: refresh-on-demand");
  } catch (error) {
    throw new Error(`Failed to revalidate tag refresh-on-demand: ${error}`);
  }
}

export async function getBootstrap(): Promise<Bootstrap> {
  try {
    return await cache(
      async () => {
        const response = await fetch(`${API_ENDPOINTS}/bootstrap-static/`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch bootstrap data: ${response.status} ${response.statusText}`
          );
        }

        console.debug("[🦠 getBootstrap]");
        return await response.json();
      },
      [JSON.stringify("bootstrap")],
      {
        revalidate: 60 * 60 * 2,
        tags: [createCacheKey("bootstrap"), "refresh-on-demand"],
      }
    )();
  } catch (error) {
    throw new Error(`Failed to get bootstrap data: ${error}`);
  }
}

export async function getLive({
  currentEventId,
}: {
  currentEventId: number;
}): Promise<Live> {
  try {
    return await cache(
      async () => {
        const response = await fetch(
          `${API_ENDPOINTS}/event/${currentEventId}/live/`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch live data: ${response.status} ${response.statusText}`
          );
        }

        console.debug(`[🚀 getLive] Event ID: ${currentEventId}`);
        return await response.json();
      },
      [JSON.stringify(["live", currentEventId])],
      {
        revalidate: 60 * 60 * 2,
        tags: [
          createCacheKey("live", currentEventId.toString()),
          "refresh-on-demand",
        ],
      }
    )();
  } catch (error) {
    throw new Error(`Failed to get live data: ${error}`);
  }
}

export async function getEntryEvent({
  entryId,
  eventId,
}: {
  entryId: number;
  eventId: number;
}): Promise<EntryEvent> {
  try {
    return await cache(
      async () => {
        const response = await fetch(
          `${API_ENDPOINTS}/entry/${entryId}/event/${eventId}/picks`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch entry picks data: ${response.status} ${response.statusText}`
          );
        }

        console.debug(
          `[🎯 getEntryEvent] Entry ID: ${entryId}, Event ID: ${eventId}`
        );
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
          "refresh-on-demand",
        ],
      }
    )();
  } catch (error) {
    throw new Error(`Failed to get entry picks data: ${error}`);
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
}): Promise<ClassicLeague> {
  try {
    return await cache(
      async () => {
        const response = await fetch(
          `${API_ENDPOINTS}/leagues-classic/${leagueId}/standings/?page_new_entries=${newEntries}&page_standings=${page}&phase=${phase}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch classic league: ${response.status} ${response.statusText}`
          );
        }

        console.debug(
          `[📊 getClassicLeague] League ID: ${leagueId}, Page: ${page}, New Entries: ${newEntries}, Phase: ${phase}`
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
          "refresh-on-demand",
        ],
      }
    )();
  } catch (error) {
    throw new Error(`Failed to get classic league data: ${error}`);
  }
}

export async function getElementSummary({
  elementId,
}: {
  elementId: number;
}): Promise<ElementSummary> {
  try {
    return await cache(
      async () => {
        const response = await fetch(
          `${API_ENDPOINTS}/element-summary/${elementId}/`
        );

        if (!response.ok) {
          throw new Error(
            `getElementSummary: ${response.status} ${response.statusText}`
          );
        }

        console.debug(`[📋 getElementSummary] Element ID: ${elementId}`);
        return await response.json();
      },
      [JSON.stringify({ "element-summary": elementId })],
      {
        revalidate: 60 * 60 * 2,
        tags: [
          createCacheKey("element-summary", elementId.toString()),
          "refresh-on-demand",
        ],
      }
    )();
  } catch (error) {
    throw new Error(`Failed to get element summary data: ${error}`);
  }
}

export async function getElementSummaryUseCase({
  elementIds,
  fixturesCount,
  historyCount,
}: {
  elementIds: number[];
  fixturesCount?: number;
  historyCount?: number;
}): Promise<ElementSummary[]> {
  try {
    const summaries = await Promise.all(
      elementIds.map((elementId) => getElementSummary({ elementId }))
    );

    const limitFixtures = (fixtures: ElementSummaryUpcomingFixture[]) => {
      if (fixturesCount && fixtures.length > fixturesCount) {
        return fixtures.slice(0, fixturesCount);
      }
      return fixtures;
    };

    const limitHistory = (history: ElementSummaryFixture[]) => {
      if (historyCount && history.length > historyCount) {
        return history.slice(-historyCount);
      }
      return history;
    };

    return summaries.map((summary, index) => ({
      id: elementIds[index],
      fixtures: limitFixtures(summary.fixtures),
      history: limitHistory(summary.history).reverse(),
    }));
  } catch (error) {
    throw new Error(`Failed to get element summaries: ${error}`);
  }
}

export async function getCurrentEventUseCase(): Promise<Event> {
  try {
    const bootstrap = await getBootstrap();

    if (!bootstrap) {
      throw new Error("Bootstrap data is undefined");
    }

    const currentEvent = bootstrap.events.find((event) => event.is_current);

    if (!currentEvent) {
      throw new Error("No current event found");
    }

    return currentEvent;
  } catch (error) {
    throw new Error(`Failed to get current event: ${error}`);
  }
}

export async function getElementsUseCase({
  elementIds,
}: {
  elementIds: number[];
}) {
  try {
    const bootstrap = await getBootstrap();

    if (!bootstrap) {
      throw new Error("No bootstrap data available");
    }

    if (!bootstrap.elements || !Array.isArray(bootstrap.elements)) {
      return [];
    }

    const elements = bootstrap.elements;

    return elements.filter((element) => elementIds.includes(element.id));
  } catch (error) {
    throw new Error(`Failed to get elements data: ${error}`);
  }
}

export async function getLiveElementsUseCase({
  currentEventId,
  elementIds,
}: {
  currentEventId: number;
  elementIds: number[];
}): Promise<LiveElement[]> {
  try {
    const live = await getLive({ currentEventId });

    if (!live) {
      return [];
    }

    const elements = live.elements.filter((element) =>
      elementIds.includes(element.id)
    );

    return elements;
  } catch (error) {
    throw new Error(`Failed to get live elements data: ${error}`);
  }
}

export async function getUniquePlayersUseCase({
  currentEventId,
  managers,
  historyCount = 3,
  fixturesCount = 3,
  params,
}: {
  currentEventId: number;
  managers: LeagueEntry[];
  historyCount?: number;
  fixturesCount?: number;
  params: SearchParams;
}): Promise<UniquePlayer[]> {
  try {
    const OWN_ENTRY_ID = 2937637;

    const eventResults = await Promise.all(
      managers.map((manager) =>
        getEntryEvent({
          entryId: manager.entry,
          eventId: currentEventId,
        })
      )
    );

    const managersMap = managers.map((m, index) => ({
      ...m,
      ...eventResults[index].entry_history,
      league_entry_rank: m.rank,
      league_entry_rank_sort: m.rank_sort,
      entry_event_history_rank: eventResults[index].entry_history.rank,
      entry_event_history_rank_sort:
        eventResults[index].entry_history.rank_sort,
    }));

    const picksIds = new Set(
      eventResults.flatMap((result) => result.picks.map((pick) => pick.element))
    );
    const uniquePlayerIds = Array.from(picksIds).sort((a, b) => a - b);

    const elements = await getElementsUseCase({ elementIds: uniquePlayerIds });
    const elementsMap = new Map(elements.map((el) => [el.id, el]));

    const live = await getLive({ currentEventId });
    const liveMap = new Map(live.elements.map((el) => [el.id, el.stats]));

    const summaries = await getElementSummaryUseCase({
      elementIds: uniquePlayerIds,
      fixturesCount,
      historyCount,
    });

    const summariesMap = new Map(
      summaries.map((summary) => [summary.id, summary])
    );

    const managerPicks = eventResults.map((result, idx) => ({
      manager: managersMap[idx],
      picks: new Set(result.picks.map((pick) => pick.element)),
    }));

    let result = uniquePlayerIds.map((playerId) => {
      const player = elementsMap.get(playerId);
      const liveStats = liveMap.get(playerId);
      const summary = summariesMap.get(playerId);

      if (!player || !liveStats || !summary) {
        throw new Error(`Player with ID ${playerId} not found`);
      }

      const associated = [];
      const dropped = [];
      let isOwnPicked = false;

      for (const { manager, picks } of managerPicks) {
        if (picks.has(playerId)) {
          associated.push(manager);
          if (manager.entry === OWN_ENTRY_ID) {
            isOwnPicked = true;
          }
        } else {
          dropped.push(manager);
        }
      }

      associated.sort((a, b) => a.entry - b.entry);
      dropped.sort((a, b) => a.entry - b.entry);

      return {
        player: { ...player, is_own_picked: isOwnPicked },
        associated,
        dropped,
        live: liveStats,
        summary,
      };
    });

    if (params.search?.trim()) {
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

    const sortFunctions: Record<
      string,
      (a: UniquePlayer, b: UniquePlayer) => number
    > = {
      "element-type": (a, b) =>
        a.player.element_type - b.player.element_type ||
        a.player.id - b.player.id,
      "most-picked": (a, b) =>
        b.associated.length - a.associated.length || a.player.id - b.player.id,
      club: (a, b) =>
        a.player.team - b.player.team || a.player.id - b.player.id,
      "own-picked": (a, b) =>
        Number(b.player.is_own_picked) - Number(a.player.is_own_picked) ||
        a.player.id - b.player.id,
      default: (a, b) => a.player.id - b.player.id,
    };

    const sortFn = sortFunctions[params.sort] || sortFunctions.default;

    result.sort(sortFn);

    return result;
  } catch (error) {
    throw new Error(`Failed to get unique players use case: ${error}`);
  }
}

export async function getTeamPlayersUseCase({
  currentEventId,
  managers,
}: {
  currentEventId: number;
  managers: LeagueEntry[];
}) {
  try {
    const eventPromises = managers.map((manager) =>
      getEntryEvent({
        entryId: manager.entry,
        eventId: currentEventId,
      })
    );

    const eventResults = await Promise.all(eventPromises);

    const managersMap = managers.map((m, index) => ({
      ...m,
      ...eventResults[index].entry_history,
    }));

    const picksIds = new Set(
      eventResults.flatMap((result) => result.picks.map((pick) => pick.element))
    );

    const elements = await getElementsUseCase({
      elementIds: Array.from(picksIds),
    });
    const elementsMap = new Map(elements.map((el) => [el.id, el]));

    const team = managersMap.map((manager, index: number) => {
      const picks = eventResults[index].picks;

      const players = picks
        .map((pick) => elementsMap.get(pick.element))
        .filter(Boolean);

      return {
        manager: manager,
        players: players,
      };
    });

    return team;
  } catch (error) {
    throw new Error(`Failed to get players data: ${error}`);
  }
}
