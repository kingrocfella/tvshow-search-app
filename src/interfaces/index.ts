export interface ITVShowSearch {
  id: number;
  name: string;
  type: string;
  language: string;
  genres: [];
  status: string;
  runtime: number;
  premiered: string;
  officialSite: string;
  schedule: { time: string; days: [] };
  rating: { average: string };
  network: object;
  image: { medium: string; original: string };
  summary: string;
}

export interface IAPIResponse {
  data: [];
}

export interface ILoading {
  text: string;
}

export interface IAlert {
  type: any;
  text: string;
}

export interface IState {
  searchTerm: string;
  episodesArray: [];
  seasonNumber: number;
}

export interface IAction {
  type: string;
  data: any;
}

export interface IEpisodes {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  airdate: string;
  airtime: string;
  runtime: number;
  image: { medium: string; original: string };
  summary: string;
}

export interface IModal {
  show: boolean;
  handleClose: any;
  body: JSX.Element;
  footer: JSX.Element;
  title: string;
}

export interface ISelect {
  data: Array<any>;
  handleChange: any;
  disabled: boolean;
  defaultValue: string | number;
  width: string;
}

export interface IDatalist {
  id: string;
  data: Array<any>;
}
