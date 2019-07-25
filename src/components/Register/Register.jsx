import React, { Component } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import {PropTypes } from 'prop-types';


class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
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
      const user = await this.props.registerUser(this.state);

      // Store the registered user locally
      this.props.setAuthUser(user);

      // If there are errors with registering the user, catch and display them.
    } catch (errors) {
      this.setState({ errors });
    }
  };

  render() {
    return (
      <RegisterForm handleInputChange={this.handleInputChange}
      handleSubmit={this.handleSubmit}
      errors={this.state.errors}
      />
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setAuthUser: PropTypes.func.isRequired,
}
export default Register;
