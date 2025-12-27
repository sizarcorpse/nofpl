import HeaderMenu from "@/components/header-menu";
import RefreshCacheButton from "@/components/refresh-cache-button";
import ThemeToggle from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import UniquePlayerFilterClub from "@/components/unique-player-filter-club";
import UniquePlayerFilterOwn from "@/components/unique-player-filter-own";
import UniquePlayerSearch from "@/components/unique-player-search";
import UniquePlayerSort from "@/components/unique-player-sort";
import { cn } from "@/libs/shadcn/utils";
import { Suspense } from "react";

const Header = () => {
  return (
    <div
      className={cn(
        "w-full max-w-96 lg:max-w-3xl xl:max-w-6xl 2xl:max-w-384",
        "gap-2 flex flex-col items-stretch justify-stretch",
        ""
      )}
    >
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div className="place-self-start flex justify-between w-full gap-2 lg:justify-start">
          <Suspense fallback={<div className="h-10" />}>
            <div className="flex gap-2">
              <RefreshCacheButton />
              <ThemeToggle />
            </div>
            <div className="flex gap-2">
              <UniquePlayerFilterOwn />
              <UniquePlayerFilterClub />
            </div>
          </Suspense>
        </div>
        <div className="w-full max-w-lg grid grid-cols-8 gap-2 place-self-end">
          <Suspense fallback={<Skeleton className="w-full h-9 col-end-5" />}>
            <UniquePlayerSearch />
            <UniquePlayerSort />
          </Suspense>
        </div>
      </div>

      <HeaderMenu />
    </div>
  );
};

export default Header;
