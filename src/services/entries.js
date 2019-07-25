import Axios from 'axios';
import config from '../config';

export default class EntriesService {
  async getJournalCategories() {
    const response = await Axios.get(`${config.apiUrl}/categories`);

    return response.data.categories;
  }

  createJournalEntry = async data => {
    await this.uploadToCloudinary(data.image);
  }

  async uploadToCloudinary(image) {
    const form = new FormData();
    form.append('file', image);
    form.append('upload_preset', 'ieyyb31b');

    const response = await Axios.post('https://api.cloudinary.com/v1_1/tsullivan/image/upload', form);
    console.log(response);
    return response.data;
  }
}