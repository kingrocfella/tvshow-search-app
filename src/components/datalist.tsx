import React from "react";
import { IDatalist } from "../interfaces";

export default function Datalist({ id, data }: IDatalist): JSX.Element {
  const Options =
    data &&
    data.map((item: string | number, index: number) => {
      return <option key={index} value={item} />;
    });

  return <datalist id={id}>{Options}</datalist>;
}
