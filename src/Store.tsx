import React from "react";
import { IState, IAction } from "./interfaces";
import { CONSTANTS } from "./constants";
import { PersistState } from "./PersistState";

const initState: IState = {
  searchTerm: "",
  episodesArray: [],
  seasonNumber: 0,
  movieID: 0,
  movieCast: []
};

export const Store = React.createContext<IState | any>(initState);

const Reducer = (state: IState, action: IAction) => {
  const { type, data } = action;
  switch (type) {
    case CONSTANTS.STATE_CLEAR_STATE:
      state = initState;
      return initState;

    case CONSTANTS.STATE_SET_SEARCHTERM:
      return PersistState({
        searchTerm: data,
        episodesArray: [],
        movieCast: [],
        seasonNumber: 0,
        movieID: 0
      });

    case CONSTANTS.STATE_SET_EPISODES:
      return PersistState({
        ...state,
        searchTerm: data.name,
        episodesArray: data._embedded.episodes,
        movieCast: []
      });

    case CONSTANTS.STATE_SET_SEASON_NUMBER:
      return PersistState({ ...state, seasonNumber: data });

    case CONSTANTS.STATE_SET_MOVIE_ID:
      return PersistState({ ...state, movieID: data });

    case CONSTANTS.STATE_SET_MOVIE_CAST:
      return PersistState({
        ...state,
        searchTerm: data.name,
        movieCast: data._embedded.cast,
        episodesArray: []
      });

    default:
      return { ...state };
  }
};

export const StoreProvider = (props: any): JSX.Element => {
  const [state, dispatch] = React.useReducer(Reducer, initState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
};
