import axios from 'axios';

export default class APIService {
  constructor(baseURL) {
    this.service = axios.create({
      baseURL,
      timeout: 10000, // Optional: set a request timeout
    });
  }

  post(path, payload) {
    return this.service.post(path, payload).then(response => response.data);
  }

  get(path, config) {
    return this.service.get(path, config).then(response => response.data);
  }

  setHeader(token) {
    this.service.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  removeHeader() {
    delete this.service.defaults.headers.common['Authorization'];
  }
}
