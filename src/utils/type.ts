// Core Types from FPL API

export interface Live {
  elements: LiveElement[];
}
export interface LiveElement {
  id: number;
  stats: LiveElementStats;
  // explain: LiveElementExplain[];
}
export interface LiveElementStats {
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bonus: number;
  bps: number;
  influence: string;
  creativity: string;
  threat: string;
  ict_index: string;
  total_points: number;
  in_dreamteam: boolean;
  clearances_blocks_interceptions: number;
  defensive_contribution: number;
  expected_assists: string;
  expected_goal_involvements: string;
  expected_goals: string;
  expected_goals_conceded: string;
  recoveries: number;
  starts: number;
  tackles: number;
}

export interface Bootstrap {
  // element_stats: ElementStats[];
  // element_types: ElementTypes[];
  elements: Element[];
  events: Event[];
  // game_settings: GameSettings;
  // phases: Phase[];
  // teams: Team[];
  // total_players: number;
}
export interface Element {
  assists: number;
  bonus: number;
  bps: number;
  chance_of_playing_next_round: number | null;
  chance_of_playing_this_round: number | null;
  clean_sheets: number;
  code: number;
  corners_and_indirect_freekicks_order: number | null;
  corners_and_indirect_freekicks_text: string;
  cost_change_event_fall: number;
  cost_change_event: number;
  cost_change_start_fall: number;
  cost_change_start: number;
  creativity: string;
  creativity_rank_type: number | null;
  creativity_rank: number | null;
  direct_freekicks_order: number | null;
  direct_freekicks_text: string;
  dreamteam_count: number;
  element_type: number;
  ep_next: string | null;
  ep_this: string | null;
  event_points: number;
  first_name: string;
  form: string;
  goals_conceded: number;
  goals_scored: number;
  ict_index: string;
  ict_index_rank_type: number | null;
  ict_index_rank: number | null;
  id: number;
  in_dreamteam: boolean;
  influence: string;
  influence_rank_type: number | null;
  influence_rank: number | null;
  minutes: number;
  news_added: string | null;
  news: string;
  now_cost: number;
  own_goals: number;
  penalties_missed: number;
  penalties_order: number | null;
  penalties_saved: number;
  penalties_text: string;
  photo: string;
  points_per_game: string;
  red_cards: number;
  saves: number;
  second_name: string;
  selected_by_percent: string;
  special: boolean;
  squad_number: number | null;
  // status: ElementStatus;
  team_code: number;
  team: number;
  threat: string;
  threat_rank_type: number | null;
  threat_rank: number | null;
  total_points: number;
  transfers_in_event: number;
  transfers_in: number;
  transfers_out_event: number;
  transfers_out: number;
  value_form: string;
  value_season: string;
  web_name: string;
  yellow_cards: number;
}
export interface Event {
  average_entry_score: number;
  // chip_plays: EventChipPlay[];
  data_checked: boolean;
  deadline_time: string;
  deadline_time_epoch: number;
  deadline_time_game_offset: number;
  finished: boolean;
  highest_score: number | null;
  highest_scoring_entry: number | null;
  id: number;
  is_current: boolean;
  is_next: boolean;
  is_previous: boolean;
  most_captained: number | null;
  most_selected: number | null;
  most_transferred_in: number | null;
  most_vice_captained: number | null;
  name: string;
  top_element: number | null;
  // top_element_info: TopElementInfo | null;
  transfers_made: number;
  cup_leagues_created: boolean;
  h2h_ko_matches_created: boolean;
}

export interface EntryEvent {
  // active_chip: ChipName | null;
  // automatic_subs: any[];
  entry_history: EntryEventHistory;
  picks: EntryEventPick[];
}
export interface EntryEventHistory {
  bank: number;
  event: number;
  event_transfers: number;
  event_transfers_cost: number;
  overall_rank: number;
  points: number;
  points_on_bench: number;
  rank: number;
  rank_sort: number;
  total_points: number;
  value: number;
}
export interface EntryEventPick {
  element: number;
  is_captain: boolean;
  is_vice_captain: boolean;
  multiplier: number;
  position: number;
}

export interface ClassicLeague {
  // league: ClassicLeagueInfo;
  // new_entries: NewLeagueEntry[];
  standings: ClassicLeagueStandings;
}
export interface ClassicLeagueStandings extends LeagueStandings {
  results: ClassicLeagueEntry[];
}
interface LeagueStandings {
  has_next: boolean;
  page: number;
}
export interface ClassicLeagueEntry extends LeagueEntry {
  event_total: number;
}
export interface LeagueEntry {
  entry: number;
  entry_name: string;
  id: number;
  last_rank: number;
  player_name: string;
  rank: number;
  rank_sort: number;
  total: number;
  event_total: number;
}

export interface ElementSummary {
  id: number;
  fixtures: ElementSummaryUpcomingFixture[];
  history: ElementSummaryFixture[];
  // history_past: ElementSummarySeason[];
}
export interface ElementSummaryUpcomingFixture {
  code: number;
  difficulty: number;
  event: number;
  event_name: string;
  finished: boolean;
  id: number;
  is_home: boolean;
  kickoff_time: string;
  minutes: number;
  provisional_start_time: boolean;
  team_a: number;
  team_a_score: number | null;
  team_h: number;
  team_h_score: number | null;
}
export interface ElementSummaryFixture {
  assists: number;
  bonus: number;
  bps: number;
  clean_sheets: number;
  creativity: string;
  element: number;
  fixture: number;
  goals_conceded: number;
  goals_scored: number;
  ict_index: string;
  influence: string;
  kickoff_time: string;
  minutes: number;
  opponent_team: number;
  own_goals: number;
  penalties_missed: number;
  penalties_saved: number;
  red_cards: number;
  round: number;
  saves: number;
  selected: number;
  team_a_score: number;
  team_h_score: number;
  threat: string;
  total_points: number;
  transfers_balance: number;
  transfers_in: number;
  transfers_out: number;
  value: number;
  was_home: boolean;
  yellow_cards: number;
  defensive_contribution: number;
  modified: boolean;
  clearances_blocks_interceptions: number;
  recoveries: number;
  tackles: number;
  starts: number;
  expected_goals: string;
  expected_assists: string;
  expected_goal_involvements: string;
  expected_goals_conceded: string;
}

export interface LeagueEntryEventHistory
  extends LeagueEntry,
    EntryEventHistory {
  league_entry_rank: number;
  league_entry_rank_sort: number;
  entry_event_history_rank: number;
  entry_event_history_rank_sort: number;
}

export type UniquePlayer = {
  player: Element & { is_own_picked: boolean };
  associated: LeagueEntryEventHistory[];
  dropped: LeagueEntryEventHistory[];
  live: LiveElementStats;
  summary: ElementSummary;
};

export type Team = {
  manager: LeagueEntryEventHistory;
  players: Element[];
};
