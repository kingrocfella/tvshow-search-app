import React from "react";
import { IMessage } from "../interfaces";

export default function ErrorMessage(props: IMessage): JSX.Element {
  return (
    <div className="alert alert-danger text-center" role="alert">
      {props.text}
    </div>
  );
}
