import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import HomeView from "./views/homeView";
import EpisodesView from "./views/episodesView";
import CastView from "./views/movieCastView";
import { ROUTES } from "./constants";

function App(): JSX.Element {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route exact path={ROUTES.home} component={HomeView} />
          <Route exact path={ROUTES.episodes} component={EpisodesView} />
          <Route exact path={ROUTES.casts} component={CastView} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
