import RefreshCacheButton from "@/components/refresh-cache-button";
import ThemeToggle from "@/components/theme-toggle";
import UniquePlayerFilter from "@/components/unique-player-filter";
import UniquePlayerSearch from "@/components/unique-player-search";
import UniquePlayerSort from "@/components/unique-player-sort";
import { Suspense } from "react";

const Header = () => {
  return (
    <div className="flex items-start justify-between gap-2 flex-col sm:flex-row">
      <div className="flex items-center justify-start gap-2 sm:items-start">
        <RefreshCacheButton />
        <ThemeToggle />
        <Suspense fallback={<div className="h-10" />}>
          <UniquePlayerFilter />
        </Suspense>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Suspense fallback={<div className="w-full max-w-md h-10" />}>
          <UniquePlayerSearch />
        </Suspense>
        <Suspense fallback={<div className="w-45 h-10" />}>
          <UniquePlayerSort />
        </Suspense>
      </div>
    </div>
  );
};

export default Header;
