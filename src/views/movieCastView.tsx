import React from "react";
import apiroutes from "../services/apiroutes";
import Spinner from "../components/spinners";
import CastBox from "../components/CastBox";
import { APICall } from "../services/apiservice";
import { Store } from "../Store";
import { IAPIResponse, ILoading, ICast } from "../interfaces";
import { ErrorHandler } from "../factories/ErrorHandler";
import { ACTIONS } from "../actions";
import { CONSTANTS } from "../constants";
import "./styles.css";
import { GetState } from "../PersistState";
import { ROUTES } from "../constants";

const GET_CAST: string = "GET_CAST";
const LOADING: string = "Loading ...";
const persistedState: any = GetState();

export default function MovieCastView(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  const [loading, handleLoading] = React.useState<string>("");
  const [error, handleError] = React.useState<string>("");

  const parameters = (): any => {
    try {
      return {
        movieID: state.movieID ? state.movieID : persistedState.movieID,
        searchTerm: state.searchTerm
          ? state.searchTerm
          : persistedState.searchTerm,
        movieCast:
          state.movieCast.length > 0
            ? state.movieCast
            : persistedState.movieCast
      };
    } catch (error) {
      window.location.href = `${window.location.origin}${ROUTES.home}`;
    }
  };

  if (
    !persistedState &&
    (!parameters()!.searchTerm || !parameters()!.movieID)
  ) {
    window.location.href = `${window.location.origin}${ROUTES.home}`;
  }

  React.useEffect(() => {
    if (parameters()!.movieCast.length === 0 && !error) GetMovieCast();
  });

  const GetMovieCast = (): void => {
    handleLoading(LOADING);
    handleAPICall(
      GET_CAST,
      apiroutes.GetMovieCast(parameters()!.movieID),
      "get"
    );
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

  const handleAPIResponse = (res: [], type: string): void => {
    switch (type) {
      case GET_CAST:
        handleLoading("");
        handleError("");
        dispatch(ACTIONS({ type: CONSTANTS.STATE_SET_MOVIE_CAST, data: res }));
        break;

      default:
        break;
    }
  };

  const loadingprops: ILoading = {
    text: LOADING
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
                <h3 className="test-cast-header">
                  {parameters()!.searchTerm}
                  's Cast
                </h3>
              }
            </header>
            <section className="episodes-section">
              {parameters()!.movieCast.map(
                (item: ICast, index: number): JSX.Element => {
                  return <CastBox key={index} {...item} />;
                }
              )}
            </section>
          </section>
        </>
      )}
    </div>
  );
}
