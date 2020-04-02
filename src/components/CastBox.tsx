import React from "react";
import NotFoundPic from "../assets/img/notfound.png";
import "./styles.css";
import {
  HTTPS,
  HandleNullValues,
  alphabeticDateFormat
} from "../factories/formatHandler";
import { ICast } from "../interfaces";

export default function CastBox(props: ICast): JSX.Element {
  return (
    <>
      <div className="card episode-box">
        <img
          className="img-fluid card-img-top"
          style={{ height: "16rem" }}
          src={
            props.person.image
              ? props.person.image.medium
                ? HTTPS(props.person.image.medium)
                : NotFoundPic
              : NotFoundPic
          }
          alt={`${props.person.name} pic`}
        />
        <div className="card-body">
          <div className="card-text">
            <section className="episodes-text">
              <div className="text-center">
                <strong>{HandleNullValues(props.person.name)}</strong>
              </div>
              <table className="table table-sm table-borderless">
                <tbody>
                  <tr>
                    <td>Character:</td>
                    <td>{HandleNullValues(props.character.name)}</td>
                  </tr>
                  <tr>
                    <td>Gender:</td>
                    <td>{HandleNullValues(props.person.gender)}</td>
                  </tr>
                  <tr>
                    <td>Birthday:</td>
                    <td>{alphabeticDateFormat(`${props.person.birthday}`)}</td>
                  </tr>
                  <tr>
                    <td>Deathday:</td>
                    <td>
                      {props.person.deathday
                        ? alphabeticDateFormat(`${props.person.deathday}`)
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
