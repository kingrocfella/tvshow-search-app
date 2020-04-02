import { IState } from "./interfaces";

export const PersistState = (state: IState): IState => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("web_state", serializedState);
  return state;
};

export const GetState = (): IState => {
  const stringifiedState: string = localStorage.getItem("web_state")!;
  return JSON.parse(stringifiedState);
};

export const RemoveState = (): void => {
  localStorage.removeItem("web_state");
};
