import React, { Component } from "react";
import { validateAll } from "indicative";
import Axios from 'axios';
import config from '../../config';

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

  handleSubmit = event => {
    event.preventDefault();

    // validating user data
    const data = this.state;
    const rules = {
      name: "required|string",
      email: "required|email",
      password: "required|string|min:6|confirmed"
    };

    const messages = {
      required: 'The {{ field }} is required.',
      'password.confirmed': 'The password confirmation does not match.',
      'email.email': 'The email address is invalid.'
    };

    validateAll(data, rules, messages)
      .then(() => {

        // register the user
        Axios.post(`${config.apiUrl}/auth/register`, {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }).then(response => {
          this.props.history.push('/');
          console.log(response);
        }).catch(errors => {
          console.log(errors.response);
          const formattedErrors = {};
          if(errors.response) formattedErrors['email'] = errors.response.data['email'][0];
          this.setState({ errors: formattedErrors });
        })

      })
      // If user validation fails, show the user on the form
      .catch(errors => {
        const formattedErrors = {};
        errors.forEach(error => (formattedErrors[error.field] = error.message));
        this.setState({ errors: formattedErrors });
      });
  };
  render() {
    return (
      <div>
        <div
          className="mh-fullscreen bg-img center-vh p-20"
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL
            }/assets/img/bg-girl.jpg)`
          }}
        >
          <div
            className="card card-shadowed p-50 w-400 mb-0"
            style={{ maxWidth: "100%" }}
          >
            <h5 className="text-uppercase text-center">Register</h5>
            <br />
            <br />
            <form className="form-type-material" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  name="name"
                  onChange={this.handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder="Username"
                />
                {this.state.errors["name"] && (
                  <small className="text-danger">
                    {this.state.errors["name"]}
                  </small>
                )}
              </div>
              <div className="form-group">
                <input
                  name="email"
                  onChange={this.handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder="Email address"
                />
                {this.state.errors["email"] && (
                  <small className="text-danger">
                    {this.state.errors["email"]}
                  </small>
                )}
              </div>
              <div className="form-group">
                <input
                  name="password"
                  onChange={this.handleInputChange}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                {this.state.errors["password"] && (
                  <small className="text-danger">
                    {this.state.errors["password"]}
                  </small>
                )}
              </div>
              <div className="form-group">
                <input
                  name="password_confirmation"
                  onChange={this.handleInputChange}
                  type="password"
                  className="form-control"
                  placeholder="Password (confirm)"
                />
              </div>
              <br />
              <button
                className="btn btn-bold btn-block btn-primary"
                type="submit"
              >
                Register
              </button>
            </form>
            <hr className="w-30" />
            <p className="text-center text-muted fs-13 mt-20">
              Already have an account?
              <a href="login.html">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
