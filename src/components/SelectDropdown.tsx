import React from "react";
import { ISelect } from "../interfaces";
import "./styles.css";
type SelectType = string | number;

export default function SelectDropdown({
  data,
  handleChange,
  disabled = false,
  defaultValue,
  width
}: ISelect): JSX.Element {
  const Options =
    data &&
    data.length > 0 &&
    data.map((option: SelectType, index: number) => {
      return (
        <option value={option} key={index}>
          {option}
        </option>
      );
    });

  return (
    <div style={{ width }}>
      <select
        className="form-control"
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="">{defaultValue ? defaultValue : "All"}</option>
        {Options}
      </select>
    </div>
  );
}
