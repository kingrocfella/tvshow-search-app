import { IAction } from "./interfaces";

export const ACTIONS = ({ type, data }: IAction): IAction => {
  return { type, data };
};
