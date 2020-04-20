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

export interface IMessage {
  text: string;
}

export interface IToggle {
  initMode: boolean;
  modeHandler: any;
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
  movieID: number;
  movieCast: [];
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

export interface ICast {
  person: {
    id: number;
    url: string;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    birthday: string;
    deathday: string;
    gender: string;
    image: {
      medium: string;
      original: string;
    };
    _links: {
      self: {
        href: string;
      };
    };
  };
  character: {
    id: number;
    url: string;
    name: string;
    image: {
      medium: string;
      original: string;
    };
    _links: {
      self: {
        href: string;
      };
    };
  };
  self: boolean;
  voice: boolean;
}
