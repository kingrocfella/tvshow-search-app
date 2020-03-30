import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeView from "./views/home";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomeView} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
