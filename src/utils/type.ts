export type Player = {
  id: number;
  code: number;
  web_name: string;
  element_type: number;
  team: number;
  first_name: string;
  second_name: string;
  now_cost: number;
  total_points: number;
  selected_by_percent: string;
};

export type Players = Player[];

export type Manager = {
  entry: number;
  entry_name: string;
  id: number;
  last_rank: number;
  player_name: string;
  rank: number;
  rank_sort: number;
  total: number;
  event_total: number;
};
export type Managers = Manager[];

export type Team = {
  manager: Manager;
  players: Players;
};

export type Teams = Team[];

export type UniquePlayerManager = {
  player: Player;
  associated: Manager[];
  dropped: Manager[];
};
