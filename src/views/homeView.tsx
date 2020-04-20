import React from "react";
import { APICall } from "../services/apiservice";
import Spinner from "../components/spinners";
import apiroutes from "../services/apiroutes";
import TVShowDetails from "../components/tvshowDetails";
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

// dogunfx imports
import ErrorMessage from "../components/ErrorMessageComponent";

type FormElem = React.FormEvent<HTMLFormElement>;

const SEARCH: string = "SEARCH";
const LOADING: string = "Loading ...";
const AUTOSUGGESTIONS: string = "AUTOSUGGESTIONS";
const EMPTY_ERROR_MESSAGE: string =
  "Please provide a series name to search for";

/**
 *  The main view components starts from here
 */
export default function HomeView(props: any): JSX.Element {
  const [searchTerm, handleSearch] = React.useState<string>("");
  const [searchResult, handleSearchResult] = React.useState<
    ITVShowSearch | any
  >({});
  const [error, handleError] = React.useState<string>("");
  const [loading, handleLoading] = React.useState<string>("");
  const [suggestions, handleSuggestions] = React.useState<Array<any>>([]);
  const { dispatch } = React.useContext(Store);
  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();

    // the if statement below prevent the search button from making request when the input field is filled with spaces
    if (!searchTerm.trim()) {
      handleError(EMPTY_ERROR_MESSAGE);
      return;
    }

    handleSuggestions([]); //reset the dropdown datalist
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
    if (!trimWhiteSpaces) return; // returns if empty space was in the search input field
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
        dispatch(ACTIONS({ type: CONSTANTS.STATE_CLEAR_STATE, data: [] }));
        handleSearchResult(res);
        handleLoading("");
        handleError("");
        dispatch(
          ACTIONS({ type: CONSTANTS.STATE_SET_SEARCHTERM, data: searchTerm })
        );
        dispatch(ACTIONS({ type: CONSTANTS.STATE_SET_MOVIE_ID, data: res.id }));
        break;

      case AUTOSUGGESTIONS:
        handleSuggestions(ConvertToArray(res)); //update the datalist dropdown
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
        {props.toggler}
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
              {/* Replaced plain JSX  with an Custom Error Message Component */}
              {error && <ErrorMessage text={error} />}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <DataList {...DataListProps} />
                  <input
                    list="searchSuggestions"
                    type="text"
                    placeholder="Search for your favorite TV Show!"
                    className="form-control home-searchbox"
                    onChange={(e: any) => {
                      handleSearch(e.target.value); //updates the search term state with the current value on the text field
                      handleError(""); //clear error state  with the handleError state updater function
                      handleAutoSuggestions(); // reform the current search term then call HandleAPICalls
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
