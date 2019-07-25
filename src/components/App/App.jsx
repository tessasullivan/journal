import React, { Component } from 'react';
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import NavBar from "../NavBar/NavBar";
import Welcome from "../Welcome/Welcome";
import Footer from "../Footer/Footer";
import CreateArticle from "../CreateArticle/CreateArticle";
import Login from "../Login/Login";
import SingleArticle from "../SingleArticle/SingleArticle";
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
          render={props => <Register {...props} registerUser={this.props.authService.registerUser} setAuthUser={this.setAuthUser} />}
        />
        <Route path="/article/:slug" component={SingleArticle} />
        <Route path="/articles/create" component={CreateArticle} />
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && <Footer />}
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  authService: PropTypes.objectOf(PropTypes.func).isRequired
}; 

export default App;
