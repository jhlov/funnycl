import classNames from "classnames";
import { LoadingLayer } from "components/LoadingLayer";
import { getAuth } from "firebase/auth";
import { CreateQuiz } from "pages/CreateQuiz";
import { Game } from "pages/Game";
import { useEffect } from "react";
import { HashRouter, Redirect, Route } from "react-router-dom";
import "./App.scss";

function App() {
  const isMobile = false;

  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      onAuthStateChanged();
    });
  }, []);

  const onAuthStateChanged = async () => {
    console.log("onAuthStateChanged", auth.currentUser);
  };

  return (
    <div className="App">
      <div className={classNames(isMobile ? "mobile-container" : "container")}>
        <HashRouter>
          <Route path="/" exact>
            <Redirect to="/game" />
          </Route>
          <Route path="/game" component={Game} />
          <Route path="/create-quiz" component={CreateQuiz} />
        </HashRouter>
        <LoadingLayer />
      </div>
    </div>
  );
}

export default App;
