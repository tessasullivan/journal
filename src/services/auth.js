import { validateAll } from "indicative";
import Axios from 'axios';
import config from '../config';

export default class AuthService {
  async registerUser(data) {
    // validating user data

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

    try {
      await validateAll(data, rules, messages);
      try {
        // Attempt to register the user 
        const response = await Axios.post(`${config.apiUrl}/auth/register`, {
          name: data.name,
          email: data.email,
          password: data.password })

        return response.data.data;

      // If there are errors with registering the user, catch and display them.
      } catch (errors) {
        const formattedErrors = {};
        if(errors.response) formattedErrors['email'] = errors.response.data['email'][0];
        return formattedErrors;
      }
      // If there are errors with the validation, catch and display them.
    } catch (errors) {
      const formattedErrors = {};
      errors.forEach(error => (formattedErrors[error.field] = error.message));
      return formattedErrors;
    }
  }
}