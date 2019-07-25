import { validateAll } from "indicative";
import Axios from "axios";
import config from "../config";

export default class AuthService {
  async registerUser(data) {
    // validating user data

    const rules = {
      name: "required|string",
      email: "required|email",
      password: "required|string|min:6|confirmed"
    };

    const messages = {
      required: "The {{ field }} is required.",
      "password.confirmed": "The password confirmation does not match.",
      "email.email": "The email address is invalid."
    };

    try {
      await validateAll(data, rules, messages);

      // Attempt to register the user
      const response = await Axios.post(`${config.apiUrl}/auth/register`, {
        name: data.name,
        email: data.email,
        password: data.password
      });

      return response.data.data;

    } catch (errors) {
      const formattedErrors = {};
      
      // If there are errors with registering the user, catch and display them.
      if (errors.response.status === 422) {
        formattedErrors["email"] = errors.response.data["email"][0];
        return Promise.reject(formattedErrors);
      }

      // If there are errors with the validation, catch and display them.
      errors.forEach(error => (formattedErrors[error.field] = error.message));
      return Promise.reject(formattedErrors);
    }
  }
  async loginUser(data) {
    // validating user data

    const rules = {
      email: "required|email",
      password: "required|string"
    };

    const messages = {
      required: "The {{ field }} is required.",
      "email.email": "The email address is invalid."
    };

    try {
      await validateAll(data, rules, messages);

      // Attempt to login the user
      const response = await Axios.post(`${config.apiUrl}/auth/login`, {
        email: data.email,
        password: data.password
      });

      return response.data.data;

    } catch (errors) {
      const formattedErrors = {};
      
      // If there are errors with logging in, catch and display them.
      if (errors.response.status === 401) {
        formattedErrors["email"] = 'Invalid credentials';
        return Promise.reject(formattedErrors);
      }

      // If there are errors with the validation, catch and display them.
      errors.forEach(error => (formattedErrors[error.field] = error.message));
      return Promise.reject(formattedErrors);
    }
  }
}
