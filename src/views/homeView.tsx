import React from "react";
import { APICall } from "../services/apiservice";
import Spinner from "../components/spinners";
import apiroutes from "../services/apiroutes";
import TVShowDetails from "../components/tvshowDetails";
import "./styles.css";
import { FormatSearchTerm, ConvertToArray } from "../factories/formatHandler";
import {
  ITVShowSearch,
  IAPIResponse,
  ILoading,
  IDatalist
} from "../interfaces";
import { ErrorHandler } from "../factories/ErrorHandler";
import { Store } from "../Store";
import { ACTIONS } from "../actions";
import { CONSTANTS } from "../constants";
import DataList from "../components/datalist";
type FormElem = React.FormEvent<HTMLFormElement>;

const SEARCH: string = "SEARCH";
const LOADING: string = "Loading ...";
const AUTOSUGGESTIONS: string = "AUTOSUGGESTIONS";

export default function HomeView(): JSX.Element {
  const [searchTerm, handleSearch] = React.useState<string>("");
  const [searchResult, handleSearchResult] = React.useState<
    ITVShowSearch | any
  >({});
  const [error, handleError] = React.useState<string>("");
  const [loading, handleLoading] = React.useState<string>("");
  const { dispatch } = React.useContext(Store);
  const [suggestions, handleSuggestions] = React.useState<Array<any>>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    handleSuggestions([]);
    handleAPICall(
      SEARCH,
      apiroutes.searchTVShow(FormatSearchTerm(searchTerm)),
      "get"
    );
    handleLoading(LOADING);
    handleSearchResult({});
  };

  const handleAutoSuggestions = () => {
    const trimWhiteSpaces = searchTerm.trim();
    if (!trimWhiteSpaces) return;
    const trimDashes = trimWhiteSpaces.replace(/-/g, "");
    handleAPICall(
      AUTOSUGGESTIONS,
      apiroutes.searchSuggestions(FormatSearchTerm(trimDashes)),
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
        handleError(
          ErrorHandler(
            err,
            `No TV Show with the name '${searchTerm}' was found!`
          )
        );
        handleLoading("");
      });
  };

  const handleAPIResponse = (res: any, type: string): void => {
    switch (type) {
      case SEARCH:
        handleSearchResult(res);
        handleLoading("");
        handleError("");
        dispatch(
          ACTIONS({ type: CONSTANTS.STATE_SET_SEARCHTERM, data: searchTerm })
        );
        dispatch(ACTIONS({ type: CONSTANTS.STATE_SET_MOVIE_ID, data: res.id }));
        break;

      case AUTOSUGGESTIONS:
        handleSuggestions(ConvertToArray(res));
        break;

      default:
        break;
    }
  };

  const DataListProps: IDatalist = {
    id: "searchSuggestions",
    data: suggestions
  };

  const loadingprops: ILoading = {
    text: LOADING
  };

  const disabled: boolean = !searchTerm ? true : false;

  return (
    <>
      <div className="container-fluid">
        <header
          className={`${
            searchResult.id ? "nospace-home-header" : "home-header"
          }`}
        >
          <div className="text-center mt-5">
            <h2>TV Shows App</h2>
            <p>Search for your favorite TV Shows using the search box below!</p>
          </div>
        </header>
        <section>
          <div className="row justify-content-center mt-5">
            <div className="col-md-6">
              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <DataList {...DataListProps} />
                  <input
                    list="searchSuggestions"
                    type="text"
                    placeholder="Search for your favorite TV Show!"
                    className="form-control home-searchbox"
                    onChange={(e: any) => {
                      handleSearch(e.target.value);
                      handleError("");
                      handleAutoSuggestions();
                    }}
                    required
                  />
                </div>
                <div className="btn-center-align">
                  <button
                    className="btn btn-outline-success btn-flat home-search-btn"
                    type="submit"
                    disabled={disabled}
                  >
                    <strong>SEARCH</strong>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        {loading && (
          <section className="mt-5">
            <Spinner {...loadingprops} />
          </section>
        )}
        {searchResult.id && (
          <section>
            <TVShowDetails {...searchResult} />
          </section>
        )}
      </div>
    </>
  );
}
