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

      this.props.setAuthUser(user);

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
}
export default Login;
