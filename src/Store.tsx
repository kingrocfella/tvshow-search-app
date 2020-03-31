import React from "react";
import { IState, IAction } from "./interfaces";
import { CONSTANTS } from "./constants";

const initState: IState = { searchTerm: "", episodesArray: [] };
export const Store = React.createContext<IState | any>(initState);

const Reducer = (state: IState, action: IAction) => {
  const { type, data } = action;
  switch (type) {
    case CONSTANTS.REDUX_SET_SEARCHTERM:
      return { ...state, searchTerm: data };

    case CONSTANTS.REDUX_SET_EPISODES:
      return { ...state, searchTerm: data.name, episodesArray: data._embedded.episodes };

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
