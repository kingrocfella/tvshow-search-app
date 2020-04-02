import React from "react";
import NotFoundPic from "../assets/img/notfound.png";
import { IEpisodes, IModal } from "../interfaces";
import "./styles.css";
import {
  alphabeticDateFormat,
  FormatHTMLString,
  HTTPS,
  HandleNullValues
} from "../factories/formatHandler";
import Modal from "./Modal";

export default function TvShowEpisodes(props: IEpisodes): JSX.Element {
  const [showModal, handleModalShow] = React.useState<boolean>(false);

  const handleModalClose = (): void => {
    handleModalShow(false);
  };

  const ModalBody: JSX.Element = (
    <div className="text-justify">
      <p>{FormatHTMLString(HandleNullValues(props.summary))}</p>
    </div>
  );

  const ModalFooter: JSX.Element = (
    <button
      className="btn btn-outline-secondary btn-flat"
      type="button"
      onClick={() => handleModalClose()}
    >
      CLOSE
    </button>
  );

  const payload: IModal = {
    title: "Episode Summary",
    show: showModal,
    handleClose: handleModalClose,
    body: ModalBody,
    footer: ModalFooter
  };

  const disabled: boolean = !props.summary ? true : false;

  return (
    <>
      <Modal {...payload} />
      <div className="card episode-box">
        <img
          className="img-fluid card-img-top"
          src={
            props.image
              ? props.image.medium
                ? HTTPS(props.image.medium)
                : NotFoundPic
              : NotFoundPic
          }
          alt={`${props.name} pic`}
        />
        <div className="card-body">
          <div className="card-text">
            <section className="episodes-text">
              <div className="text-center">
                <strong>{props.name}</strong>
              </div>
              <div className="text-center">
                <strong>Season: {props.season}</strong>
              </div>
              <table className="table table-sm table-borderless">
                <tbody>
                  <tr>
                    <td>Number:</td>
                    <td>{props.number}</td>
                  </tr>
                  <tr>
                    <td>Air Date:</td>
                    <td>{alphabeticDateFormat(`${props.airdate}`)}</td>
                  </tr>
                  <tr>
                    <td>Run Time:</td>
                    <td>{props.runtime} mins</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center mt-3">
                <button
                  className="btn btn-outline-success btn-flat"
                  type="button"
                  onClick={() => handleModalShow(true)}
                  disabled={disabled}
                >
                  Episode Summary
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
