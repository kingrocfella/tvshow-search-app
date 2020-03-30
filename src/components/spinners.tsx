import React from "react";
import { ILoading } from "../interfaces";

export default function Spinners(props: ILoading): JSX.Element {
  return (
    <div className="text-center">
      <div className="spinner-border" role="status"></div> <br />
      <span>{props.text}</span>
    </div>
  );
}
