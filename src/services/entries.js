import Axios from "axios";
import config from "../config";

export default class EntriesService {
  async getJournalCategories() {
    const response = await Axios.get(`${config.apiUrl}/categories`);

    return response.data.categories;
  }

  createJournalEntry = async (data, token) => {
    // First upload image to Cloudinary and then upload article
    const image = await this.uploadToCloudinary(data.image);
    try {
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
      return errors.response.data;
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
