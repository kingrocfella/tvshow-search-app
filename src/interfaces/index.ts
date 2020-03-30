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
