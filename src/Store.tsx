import React from "react";
import { IState, IAction } from "./interfaces";
import { CONSTANTS } from "./constants";
import { PersistState } from "./PersistState";

const initState: IState = {
  searchTerm: "",
  episodesArray: [],
  seasonNumber: 0
};
export const Store = React.createContext<IState | any>(initState);

const Reducer = (state: IState, action: IAction) => {
  const { type, data } = action;
  let newState;
  switch (type) {
    case CONSTANTS.REDUX_SET_SEARCHTERM:
      newState = { ...state, searchTerm: data, episodesArray: [] };
      PersistState(newState);
      return newState;

    case CONSTANTS.REDUX_SET_EPISODES:
      newState = {
        ...state,
        searchTerm: data.name,
        episodesArray: data._embedded.episodes
      };
      PersistState(newState);
      return newState;

    case CONSTANTS.REDUX_SET_SEASON_NUMBER:
      newState = { ...state, seasonNumber: data };
      PersistState(newState);
      return newState;

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
