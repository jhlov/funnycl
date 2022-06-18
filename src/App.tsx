import classNames from "classnames";
import { LoadingLayer } from "components/LoadingLayer";
import { Game } from "pages/Game";
import React from "react";
import { HashRouter, Redirect, Route } from "react-router-dom";
import "./App.scss";

function App() {
  const isMobile = false;

  return (
    <div className="App">
      <div className={classNames(isMobile ? "mobile-container" : "container")}>
        <HashRouter>
          <Route path="/" exact>
            <Redirect to="/game" />
          </Route>
          <Route path="/game" component={Game} />
        </HashRouter>
        <LoadingLayer />
      </div>
    </div>
  );
}

export default App;
