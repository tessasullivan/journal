import React, { Component } from "react";
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

class App extends Component {
  constructor() {
    super();

    this.state = {
      authUser: null
    };
  }
  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user) {
      this.setState({ authUser: JSON.parse(user) });
    }
  }

  setAuthUser = authUser => {
    this.setState({ authUser });
  };

  removeAuthUser = () => {
    localStorage.removeItem('user');
    this.setState({authUser: null});
  };

  render() {

    const { location } = this.props;
    return (
      <div>
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <NavBar authUser={this.state.authUser} removeAuthUser={this.removeAuthUser}/>
          )}
        <Route exact path="/" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route
          path="/register"
          render={props => <Register {...props} setAuthUser={this.setAuthUser} />}
        />
        <Route path="/article/:slug" component={SingleArticle} />
        <Route path="/articles/create" component={CreateArticle} />
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && <Footer />}
      </div>
    );
  }
}

const Main = withRouter(props => {
  return <App {...props} />;
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
