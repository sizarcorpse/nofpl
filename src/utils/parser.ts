import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  sort: parseAsStringLiteral([
    "element-type",
    "most-picked",
    "club",
  ]).withDefault("club"),
  search: parseAsString.withDefault(""),
  filter: parseAsStringLiteral(["own-picked", ""]).withDefault(""),
  tabs: parseAsStringLiteral([
    "picked",
    "dropped",
    "history",
    "fixtures",
  ]).withDefault("picked"),
});

export type SearchParams = Awaited<ReturnType<typeof searchParamsCache.parse>>;
