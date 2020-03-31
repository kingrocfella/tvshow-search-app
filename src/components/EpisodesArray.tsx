import React from "react";
import { IEpisodes } from "../interfaces";
import "./styles.css";

export default function TvShowEpisodes(props: IEpisodes) {
  return (
    <div className="episode-box">
      <img src={props.image.medium} alt="kk" />
    </div>
  );
}
