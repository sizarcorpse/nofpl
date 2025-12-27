"use client";

const HeaderMenu = () => {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="flex gap-2 sticky top-0 z-10 bg-background/80 py-2 backdrop-blur-md px-4 lg:px-0">
      <button
        className="text-xs text-foreground/50 p-0 cursor-pointer hover:text-foreground"
        onClick={() => handleScroll("players")}
      >
        Players
      </button>
      <button
        className="text-xs text-foreground/50 p-0 cursor-pointer hover:text-foreground"
        onClick={() => handleScroll("teams")}
      >
        Teams
      </button>
    </nav>
  );
};

export default HeaderMenu;
