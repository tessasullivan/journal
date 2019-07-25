import React, { Component } from "react";
import LoginForm from "./LoginForm/LoginForm";
import {PropTypes } from 'prop-types';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      const user = await this.props.loginUser(this.state);

      localStorage.setItem("user", JSON.stringify(user));
      this.props.setAuthUser(user);
      this.props.history.push("/");

    } catch (errors) {
      this.setState({errors})
    }


  };

  render() {
    return (
      <LoginForm
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setAuthUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
}
export default Login;
