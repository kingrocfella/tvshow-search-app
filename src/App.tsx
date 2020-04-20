import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import HomeView from "./views/homeView";
import EpisodesView from "./views/episodesView";
import CastView from "./views/movieCastView";
import NightModeToggle from "./components/NightModeSwitcher";
import { ROUTES } from "./constants";
import { UI_MODES } from "./constants";
import { TOGGLER_CAPTION } from "./constants";

// imported css the in the root component so every child component has access to rules defines in the css
import "./views/styles.css";
import "./components/styles.scss";

function App(): JSX.Element {
  const [ui_mode, handleUIMode] = React.useState<boolean>(UI_MODES.DAY);

  const toggler = (
    <NightModeToggle
      initMode={UI_MODES.NIGHT}
      text={TOGGLER_CAPTION}
      modeHandler={() =>
        handleUIMode((preMode) =>
          preMode === UI_MODES.NIGHT ? UI_MODES.DAY : UI_MODES.NIGHT
        )
      }
    />
  );
  return (
    <HashRouter>
      <div
        className={ui_mode ? "App-default App-Night-Mode" : "App-default App"}
      >
        <Switch>
          <Route
            exact
            path={ROUTES.home}
            render={(routeProps) => <HomeView toggler={toggler} />}
          />
          <Route
            exact
            path={ROUTES.episodes}
            render={(routeProps) => <EpisodesView toggler={toggler} />}
          />
          <Route
            exact
            path={ROUTES.casts}
            render={(routeProps) => <CastView toggler={toggler} />}
          />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
