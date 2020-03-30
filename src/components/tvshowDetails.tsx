import React from "react";
import { ITVShowSearch } from "../interfaces";
import {
  FlattenArray,
  alphabeticDateFormat,
  FormatHTMLString
} from "../factories/formatHandler";

export default function tvshowDetails(props: ITVShowSearch): JSX.Element {
  /**
   * use react context to grab the search term and call the embeded episodes API
   */
  const _runningcolor =
    props.status.toLowerCase() === "running" ? "green" : "red";
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="btn-right-align mb-3">
          <button className="btn btn-info btn-flat" type="button">
            View Episodes
          </button>
        </div>
        <div className="row">
          <div className="col-md-4">
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
                    <strong>{props.name}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Type: </td>
                  <td>
                    <strong>{props.type}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Language: </td>
                  <td>
                    <strong>{props.language}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Genres: </td>
                  <td>
                    <strong>{FlattenArray(props.genres)}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Status: </td>
                  <td>
                    <strong style={{ color: _runningcolor }}>
                      {props.status}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>Runtime: </td>
                  <td>
                    <strong>{props.runtime}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Premier Time: </td>
                  <td>
                    <strong>{alphabeticDateFormat(props.premiered)}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Schedule: </td>
                  <td>
                    <strong>{`${FlattenArray(props.schedule.days)} ${
                      props.schedule.time
                    }`}</strong>
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
                      {props.rating.average}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-justify mt-2">
          <strong>Summary:</strong> <p>{FormatHTMLString(props.summary)}</p>
        </div>
      </div>
    </div>
  );
}
