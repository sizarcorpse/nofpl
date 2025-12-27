import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

import { TEAMS } from "@/utils/data";

export const searchParamsCache = createSearchParamsCache({
  sort: parseAsStringLiteral([
    "element-type",
    "most-picked",
    "club",
    "most-points",
    "most-captains",
  ]).withDefault("club"),
  search: parseAsString.withDefault(""),
  filter: parseAsStringLiteral(["own-picked", ""]).withDefault(""),
  club: parseAsStringLiteral(Object.keys(TEAMS)).withDefault(""),
  tabs: parseAsStringLiteral([
    "picked",
    "dropped",
    "history",
    "fixtures",
  ]).withDefault("picked"),
});

export type SearchParams = Awaited<ReturnType<typeof searchParamsCache.parse>>;
