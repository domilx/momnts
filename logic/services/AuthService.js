import APIService from './APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AuthService {
  constructor(baseURL) {
    this.apiService = new APIService(baseURL);
  }

  async register(email, password, username) {
    return this.apiService.post('/register', { email, password, username });
  }

  async login(email, password) {
    const data = await this.apiService.post('/login', { email, password });
    if (data.access_token && data.refresh_token) {
      await AsyncStorage.multiSet([
        ['access_token', data.access_token],
        ['refresh_token', data.refresh_token],
      ]);
      this.apiService.setHeader(data.access_token);
    }
    return data;
  }

  async refreshToken() {
    const refresh_token = await AsyncStorage.getItem('refresh_token');
    const data = await this.apiService.post('/refresh', { refresh_token });
    if (data.access_token) {
      await AsyncStorage.setItem('access_token', data.access_token);
      this.apiService.setHeader(data.access_token);
    }
    return data;
  }

  async getProtectedData() {
    const token = await AsyncStorage.getItem('access_token');
    this.apiService.setHeader(token);
    return this.apiService.get('/protected');
  }

  async logout() {
    await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
    this.apiService.removeHeader();
  }

  async validateToken() {
    const token = await AsyncStorage.getItem('access_token');
    this.apiService.setHeader(token);
    return this.apiService.get('/validate_token');  // Assumes the endpoint returns { isValid: true/false }
  }
}
