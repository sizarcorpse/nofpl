import ThemeToggle from "@/components/theme-toggle";
import UniquePlayerSearch from "@/components/unique-player-search";
import UniquePlayerSort from "@/components/unique-player-sort";

const Header = () => {
  return (
    <div className="flex items-center justify-end w-full gap-2">
      <UniquePlayerSearch />
      <UniquePlayerSort />
      <ThemeToggle />
    </div>
  );
};

export default Header;
