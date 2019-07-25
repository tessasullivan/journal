import Axios from 'axios';
import config from '../config';

export default class EntriesService {
  async getJournalCategories() {
    const response = await Axios.get(`${config.apiUrl}/categories`);

    return response.data.categories;
  }
}