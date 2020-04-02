import React from "react";
import apiroutes from "../services/apiroutes";
import Spinner from "../components/spinners";
import EpisodesBox from "../components/EpisodesBox";
import { APICall } from "../services/apiservice";
import { Store } from "../Store";
import { IAPIResponse, ILoading, IEpisodes, ISelect } from "../interfaces";
import { ErrorHandler } from "../factories/ErrorHandler";
import { ACTIONS } from "../actions";
import { CONSTANTS } from "../constants";
import "./styles.css";
import { GetState } from "../PersistState";
import { ROUTES } from "../constants";
import SelectDropdown from "../components/SelectDropdown";
import { NumberArray } from "../factories/formatHandler";
import { FaFilter } from "react-icons/fa";

const GET_EPISODES: string = "GET_EPISODES";
const GET_SEASON_NUMBER: string = "GET_SEASON_NUMBER";
const LOADING: string = "Loading ...";
const persistedState: any = GetState();

export default function EpisodesView(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  const [loading, handleLoading] = React.useState<string>("");
  const [error, handleError] = React.useState<string>("");
  const [selectedSeason, handleSelectedSeason] = React.useState<number>(0);

  const parameters = (): any => {
    try {
      return {
        seasonNumber: state.seasonNumber
          ? state.seasonNumber
          : persistedState.seasonNumber,
        searchTerm: state.searchTerm
          ? state.searchTerm
          : persistedState.searchTerm,
        episodesArray:
          state.episodesArray.length > 0
            ? state.episodesArray
            : persistedState.episodesArray
      };
    } catch (error) {
      window.location.href = `${window.location.origin}${ROUTES.home}`;
    }
  };

  if (
    !persistedState &&
    (!parameters()!.searchTerm || parameters()!.episodesArray.length === 0)
  ) {
    window.location.href = `${window.location.origin}${ROUTES.home}`;
  }

  React.useEffect(() => {
    if (parameters()!.episodesArray.length === 0 && !error) GetEpisodes();
  });



  const GetEpisodes = (): void => {
    handleLoading(LOADING);
    handleAPICall(
      GET_EPISODES,
      apiroutes.getEpisodes(parameters()!.searchTerm),
      "get"
    );
  };

  const GetSeasonNumber = (id: number): void => {
    handleAPICall(GET_SEASON_NUMBER, apiroutes.getSeasonsById(id), "get");
  };

  const handleAPICall = (
    resType: string,
    route: string,
    method: string,
    data: object = {}
  ): void => {
    APICall(route, method, data)
      .then((res: IAPIResponse) => handleAPIResponse(res.data, resType))
      .catch((err: any) => {
        handleError(ErrorHandler(err));
        handleLoading("");
      });
  };

  const handleAPIResponse = (res: any, type: string): void => {
    switch (type) {
      case GET_EPISODES:
        handleLoading("");
        handleError("");
        dispatch(ACTIONS({ type: CONSTANTS.STATE_SET_EPISODES, data: res }));
        GetSeasonNumber(res.id);
        break;

      case GET_SEASON_NUMBER:
        dispatch(
          ACTIONS({ type: CONSTANTS.STATE_SET_SEASON_NUMBER, data: res.length })
        );
        break;

      default:
        break;
    }
  };

  const loadingprops: ILoading = {
    text: LOADING
  };

  const handleChange = (e: any): void => {
    handleSelectedSeason(e.target.value);
  };

  const selectProps: ISelect = {
    data: NumberArray(parameters()!.seasonNumber),
    handleChange,
    defaultValue: "All Seasons",
    disabled: false,
    width: "10rem"
  };

  const filterResult = (): Array<IEpisodes> => {
    if (!selectedSeason) return parameters()!.episodesArray;
    return parameters()!.episodesArray.filter(
      (item: IEpisodes) => Number(item.season) === Number(selectedSeason)
    );
  };

  return (
    <div>
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      {loading && (
        <section className="mt-5 loading">
          <Spinner {...loadingprops} />
        </section>
      )}
      {!loading && (
        <>
          <section className="container-fluid mt-5 mb-5">
            <header className="text-center mt-4 mb-5">
              {
                <h3 className="test-episodes-header">
                  {parameters()!.searchTerm}
                  's Episodes
                </h3>
              }
            </header>
            <section className="mb-5">
              <div className="btn-center-align test-episodes-filter">
                <SelectDropdown {...selectProps} />
                <span className="ml-3">
                  <FaFilter />
                </span>
              </div>
            </section>
            <section className="episodes-section">
              {filterResult().map(
                (item: IEpisodes): JSX.Element => {
                  return <EpisodesBox key={item.id} {...item} />;
                }
              )}
            </section>
          </section>
        </>
      )}
    </div>
  );
}
