export const CONSTANTS = {
  BASE_API_URL: "https://api.tvmaze.com",

  /**
   * STATE ACTION CONSTANTS
   */
  STATE_CLEAR_STATE: "CLEAR_STATE",
  STATE_SET_SEARCHTERM: "SET_SEARCHTERM",
  STATE_SET_EPISODES: "SET_EPISODES",
  STATE_SET_SEASON_NUMBER: "SET_SEASON_NUMBER",
  STATE_SET_MOVIE_ID: "SET_MOVIE_ID",
  STATE_SET_MOVIE_CAST: "SET_MOVIE_CAST"
};

/**
 *  Modes for the UI
 */
export const UI_MODES = {
  NIGHT: false,
  DAY: true
};

/**
 * Night Toggler Caption
 */

export const TOGGLER_CAPTION = "Toggle Night Mode";

export const ROUTES = {
  home: "/",
  episodes: "/episodes/view",
  casts: "/movie/cast"
};
