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
});

export type SearchParams = Awaited<ReturnType<typeof searchParamsCache.parse>>;
