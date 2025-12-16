export const API_ENDPOINTS = "https://fantasy.premierleague.com/api";

export const ELEMENT_TYPE: { [key: number]: string } = {
  1: "Goalkeeper",
  2: "Defender",
  3: "Midfielder",
  4: "Forward",
};

export const TEAMS: {
  [key: number]: {
    name: string;
    short_name: string;
    code: number;
    color_code: string;
  };
} = {
  1: {
    name: "Arsenal",
    short_name: "ARS",
    code: 3,
    color_code: "#EF0107",
  },
  2: {
    name: "Aston Villa",
    short_name: "AVL",
    code: 7,
    color_code: "#7A003C",
  },
  3: {
    name: "Burnley",
    short_name: "BUR",
    code: 90,
    color_code: "#6A0DAD",
  },
  4: {
    name: "Bournemouth",
    short_name: "BOU",
    code: 91,
    color_code: "#E03A3E",
  },
  5: {
    name: "Brentford",
    short_name: "BRE",
    code: 94,
    color_code: "#B41F1F",
  },
  6: {
    name: "Brighton",
    short_name: "BHA",
    code: 36,
    color_code: "#0057B8",
  },
  7: {
    name: "Chelsea",
    short_name: "CHE",
    code: 8,
    color_code: "#034694",
  },
  8: {
    name: "Crystal Palace",
    short_name: "CRY",
    code: 31,
    color_code: "#8B0000",
  },
  9: {
    name: "Everton",
    short_name: "EVE",
    code: 11,
    color_code: "#003399",
  },
  10: {
    name: "Fulham",
    short_name: "FUL",
    code: 54,
    color_code: "#FFFFFF",
  },
  11: {
    name: "Leeds",
    short_name: "LEE",
    code: 2,
    color_code: "#FFFFFF",
  },
  12: {
    name: "Liverpool",
    short_name: "LIV",
    code: 14,
    color_code: "#C8102E",
  },
  13: {
    name: "Man City",
    short_name: "MCI",
    code: 43,
    color_code: "#0057B8",
  },
  14: {
    name: "Man Utd",
    short_name: "MUN",
    code: 1,
    color_code: "#DA291C",
  },
  15: {
    name: "Newcastle",
    short_name: "NEW",
    code: 4,
    color_code: "#000000",
  },
  16: {
    name: "Nott'm Forest",
    short_name: "NFO",
    code: 17,
    color_code: "#B41F1F",
  },
  17: {
    name: "Sunderland",
    short_name: "SUN",
    code: 56,
    color_code: "#E03A3E",
  },
  18: {
    name: "Spurs",
    short_name: "TOT",
    code: 6,
    color_code: "#FFFFFF",
  },
  19: {
    name: "West Ham",
    short_name: "WHU",
    code: 21,
    color_code: "#551A8B",
  },
  20: {
    name: "Wolves",
    short_name: "WOL",
    code: 39,
    color_code: "#FFD700",
  },
};
