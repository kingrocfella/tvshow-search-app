import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeView from "./views/homeView";
import EpisodesView from "./views/episodesView";
import { ROUTES } from "./constants";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={ROUTES.home} component={HomeView} />
          <Route exact path={ROUTES.episodes} component={EpisodesView} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
