import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import NavBar from './components/NavBar/NavBar';
import Welcome from './components/Welcome/Welcome';
import Footer from './components/Footer/Footer';
import CreateArticle from './components/CreateArticle/CreateArticle';

const Home = () => {
  return <h1>Home page</h1>;
};

const About = () => {
  return <h1>About page</h1>;
};

ReactDOM.render(
  <BrowserRouter>
    <div>
      <NavBar />
      <Route exact path="/" component={Welcome} />
      <Route path="/about" component={About} />
      <Route path="/home" component={Home} />
      <Route path="/articles/create" component={CreateArticle} />
      <Footer />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
