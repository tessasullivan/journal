import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import NavBar from "../NavBar/NavBar";
import Welcome from "../Welcome/Welcome";
import Footer from "../Footer/Footer";
import CreateJournalEntry from "../CreateJournalEntry/CreateJournalEntry";
import Login from "../Login/Login";
import SingleJournalEntry from "../SingleJournalEntry/SingleJournalEntry";
import Register from "../Register/Register";

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
    this.setState({ authUser }, () => {
      localStorage.setItem("user", JSON.stringify(authUser));
      this.props.history.push("/");
    });
  };

  removeAuthUser = () => {
    localStorage.removeItem("user");
    this.setState({ authUser: null });
  };

  render() {
    const { location } = this.props;
    return (
      <div>
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <NavBar
              authUser={this.state.authUser}
              removeAuthUser={this.removeAuthUser}
            />
          )}
        <Route exact path="/" component={Welcome} />
        <Route
          path="/login"
          render={props => (
            <Login
              {...props}
              loginUser={this.props.authService.loginUser}
              setAuthUser={this.setAuthUser}
            />
          )}
        />
        <Route
          path="/register"
          render={props => (
            <Register
              {...props}
              registerUser={this.props.authService.registerUser}
              setAuthUser={this.setAuthUser}
            />
          )}
        />
        <Route path="/entry/:slug" component={SingleJournalEntry} />
        <Route
          path="/entries/create"
          render={props => (
            <CreateJournalEntry
              {...props}
              getJournalCategories={
                this.props.entriesService.getJournalCategories
              }
            />
          )}
        />

        {location.pathname !== "/login" &&
          location.pathname !== "/register" && <Footer />}
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  authService: PropTypes.objectOf(PropTypes.func).isRequired,
  entriesService: PropTypes.objectOf(PropTypes.func).isRequired
};

export default App;
