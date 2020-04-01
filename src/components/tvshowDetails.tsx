import React from "react";
import { ITVShowSearch } from "../interfaces";
import {
  FlattenArray,
  alphabeticDateFormat,
  FormatHTMLString,
  HandleNullValues
} from "../factories/formatHandler";
import { ROUTES } from "../constants";
import { useHistory } from "react-router-dom";

export default function TvshowDetails(props: ITVShowSearch): JSX.Element {
  /**
   * use react context to grab the search term and call the embeded episodes API
   */
  const history = useHistory();

  const handleNavigation = (route: string) => {
    history.push(route);
  };

  const disabled = String(props.status).toLowerCase() === "in development";

  const _runningcolor =
    props.status.toLowerCase() === "running" ? "green" : "red";
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="btn-right-align mb-3">
          <button
            className="btn btn-info btn-flat"
            type="button"
            onClick={() => handleNavigation(ROUTES.episodes)}
            disabled={disabled}
          >
            View Episodes
          </button>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <img
              className="img-fluid mx-auto d-block"
              src={props.image.medium}
              alt={`${props.name} poster`}
            />
          </div>
          <div className="col-md-8">
            <table className="table table-sm table-borderless">
              <tbody>
                <tr>
                  <td>Name: </td>
                  <td>
                    <strong>{HandleNullValues(props.name)}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Type: </td>
                  <td>
                    <strong>{HandleNullValues(props.type)}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Language: </td>
                  <td>
                    <strong>{HandleNullValues(props.language)}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Genres: </td>
                  <td>
                    <strong>
                      {HandleNullValues(FlattenArray(props.genres))}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>Status: </td>
                  <td>
                    <strong style={{ color: _runningcolor }}>
                      {HandleNullValues(props.status)}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>Runtime: </td>
                  <td>
                    <strong>{HandleNullValues(props.runtime)} mins</strong>
                  </td>
                </tr>
                <tr>
                  <td>Premier Date: </td>
                  <td>
                    <strong>
                      {HandleNullValues(alphabeticDateFormat(props.premiered))}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>Schedule: </td>
                  <td>
                    <strong>
                      {HandleNullValues(
                        `${FlattenArray(props.schedule.days)} ${
                          props.schedule.time
                        }`
                      )}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>Average Rating: </td>
                  <td>
                    <strong
                      style={{
                        color: `${
                          Number(props.rating.average) >= 0.5 ? "green" : "red"
                        }`
                      }}
                    >
                      {HandleNullValues(props.rating.average)}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-justify mt-2">
          <strong>Summary:</strong>{" "}
          <p>{HandleNullValues(FormatHTMLString(props.summary))}</p>
        </div>
      </div>
    </div>
  );
}
