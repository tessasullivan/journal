import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import NavBar from "./components/NavBar/NavBar";
import Welcome from "./components/Welcome/Welcome";
import Footer from "./components/Footer/Footer";
import CreateArticle from "./components/CreateArticle/CreateArticle";
import Login from "./components/Login/Login";
import SingleArticle from "./components/SingleArticle/SingleArticle";
import Register from "./components/Register/Register";

const Main = withRouter(({ location }) => {
  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <NavBar />
      )}
      <Route exact path="/" component={Welcome} />
      <Route path="/article/:id" component={SingleArticle} />
      <Route path="/articles/create" component={CreateArticle} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Footer />
      )}
    </div>
  );
});

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
