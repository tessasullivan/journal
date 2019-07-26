import Axios from "axios";
import config from "../config";
import {validateAll } from 'indicative'; 

export default class EntriesService {
  async getJournalCategories() {
    const response = await Axios.get(`${config.apiUrl}/categories`);

    return response.data.categories;
  }

  createJournalEntry = async (data, token) => {

    if (!data.image) {
      return Promise.reject([{
        message: 'The image is required.',
      }]);
    }

    try {
      const rules = {
        title: 'required',
        image: 'required',
        content: 'required',
        category: 'required',
      };

      const messages = {
        required: 'The {{ field }} is required',
      };

      validateAll(data, rules, messages);

      // First upload image to Cloudinary and then upload article
      const image = await this.uploadToCloudinary(data.image);
      const response = await Axios.post(
        `${config.apiUrl}/articles`,
        {
          title: data.title,
          content: data.content,
          category_id: data.category,
          imageUrl: image.secure_url
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response);
      return response.data;
    } catch (errors) {

      // Errors from the server
      if (errors.response) {
        return Promise.reject(errors.response.data);
      } 
      // Validation errors from client
      return Promise.reject(errors);
    }
  };

  async uploadToCloudinary(image) {
    const form = new FormData();
    form.append("file", image);
    form.append("upload_preset", "ieyyb31b");

    const response = await Axios.post(
      "https://api.cloudinary.com/v1_1/tsullivan/image/upload",
      form
    );
    console.log(response);
    return response.data;
  }
}
