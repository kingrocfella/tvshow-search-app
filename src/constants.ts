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
   STATE_SET_MOVIE_CAST: "SET_MOVIE_CAST",
}

export const ROUTES = {
  home: "/",
  episodes: "/episodes/view",
  casts: "/movie/cast"
}