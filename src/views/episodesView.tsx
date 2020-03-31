import React from "react";
import apiroutes from "../services/apiroutes";
import Spinner from "../components/spinners";
import EpisodesList from "../components/EpisodesArray";
import { APICall } from "../services/apiservice";
import { Store } from "../Store";
import { IAPIResponse, ILoading, IEpisodes } from "../interfaces";
import { ErrorHandler } from "../factories/ErrorHandler";
import { ACTIONS } from "../actions";
import { CONSTANTS } from "../constants";
import "./styles.css";

const GET_EPISODES = "GET_EPISODES";
const LOADING = "Loading ...";

export default function EpisodesView() {
  const { state, dispatch } = React.useContext(Store);
  const [loading, handleLoading] = React.useState<string>("");
  const [error, handleError] = React.useState<string>("");

  React.useEffect(() => {
    if (state.episodesArray.length === 0 && !error) GetEpisodes();
  });

  const GetEpisodes = () => {
    handleLoading(LOADING);
    handleAPICall(GET_EPISODES, apiroutes.getEpisodes(state.searchTerm), "get");
  };

  const handleAPICall = (
    resType: string,
    route: string,
    method: string,
    data: object = {}
  ) => {
    APICall(route, method, data)
      .then((res: IAPIResponse) => handleAPIResponse(res.data, resType))
      .catch((err: any) => {
        handleError(ErrorHandler(err));
        handleLoading("");
      });
  };

  const handleAPIResponse = (res: {}, type: string) => {
    switch (type) {
      case GET_EPISODES:
        handleLoading("");
        handleError("");
        dispatch(ACTIONS({ type: CONSTANTS.REDUX_SET_EPISODES, data: res }));
        break;

      default:
        break;
    }
  };

  const loadingprops: ILoading = {
    text: LOADING
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      {loading && (
        <section className="mt-5">
          <Spinner {...loadingprops} />
        </section>
      )}
      <section className="container-fluid">
        <header className="text-center mt-4 mb-5">
          {state.searchTerm && <h3>{state.searchTerm}'s Episodes</h3>}
        </header>
        <section className="episodes-section">
          {state.episodesArray.map(
            (item: IEpisodes): JSX.Element => {
              return <EpisodesList key={item.id} {...item} />;
            }
          )}
        </section>
      </section>
    </>
  );
}
