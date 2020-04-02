import React from "react";
import { ITVShowSearch } from "../interfaces";
import {
  FlattenArray,
  alphabeticDateFormat,
  FormatHTMLString,
  HandleNullValues,
  HTTPS
} from "../factories/formatHandler";
import { ROUTES } from "../constants";
import { useHistory } from "react-router-dom";
import NotFoundPic from "../assets/img/notfound.png";

export default function TvshowDetails(props: ITVShowSearch): JSX.Element {

  const history = useHistory();

  const handleNavigation = (route: string): void => {
    history.push(route);
  };

  const disabled: boolean =
    String(props.status).toLowerCase() === "in development";

  const _runningcolor: string =
    props.status.toLowerCase() === "running" ? "green" : "red";
  return (
    <div className="row justify-content-center mt-5 home-search-detail">
      <div className="col-md-6">
        <div className="btn-right-align mb-3">
          <button
            className="btn btn-info btn-flat test-home-btn1"
            type="button"
            onClick={() => handleNavigation(ROUTES.episodes)}
            disabled={disabled}
          >
            View Episodes
          </button>
          <button
            className="btn btn-danger btn-flat ml-2 test-home-btn2"
            type="button"
            onClick={() => handleNavigation(ROUTES.casts)}
            disabled={disabled}
          >
            View Cast
          </button>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <img
              className="img-fluid mx-auto d-block test-home-img"
              src={
                props.image
                  ? props.image.medium
                    ? HTTPS(props.image.medium)
                    : NotFoundPic
                  : NotFoundPic
              }
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
