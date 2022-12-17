import { LoadingLayer } from "components/LoadingLayer";
import { getAuth } from "firebase/auth";
import _ from "lodash";
import { Admin } from "pages/Admin";
import { CreateQuiz } from "pages/CreateQuiz";
import { Game } from "pages/Game";
import { Home } from "pages/Home";
import { Login } from "pages/Login";
import { Logout } from "pages/Logout";
import { useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.scss";

function App() {
  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      onAuthStateChanged();
    });
  }, []);

  const onAuthStateChanged = async () => {
    console.log("onAuthStateChanged", auth.currentUser);
    if (_.isNil(auth.currentUser)) {
      if (!window.location.href.includes("/login")) {
        window.location.href = "/#/login";
      }
    }
  };

  return (
    <div className="App">
      <HashRouter>
        <Route path="/" component={Home} exact />
        <Route path="/game" component={Game} />
        <Route path="/admin" component={Admin} />
        <Route path="/create-quiz" component={CreateQuiz} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </HashRouter>
      <LoadingLayer />
    </div>
  );
}

export default App;
