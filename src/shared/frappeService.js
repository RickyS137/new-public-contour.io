import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class FrappeService {
  constructor({ baseUrl = BASE_URL, authToken = null } = {}) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: this.authToken
      ? { Authorization: `token ${this.authToken}` }
      : {},
      withCredentials: true
    });
  }

  setAuthToken(token) {
    this.authToken = token;
    this.client.defaults.headers['Authorization'] = `token ${token}`;
  }

  async getDoc(doctype, name) {
    const url = `/api/resource/${doctype}/${name}`;
    const response = await this.client.get(url);
    return response.data.data;
  }

  async getList(doctype, { fields = [], page_length = 0, start = 0 } = {}) {
    const url = `/api/resource/${doctype}`;
    const params = [];
  
    if (fields.length > 0) {
      params.push(`fields=[${fields.map(field => `"${field}"`).join(",")}]`);
    }
  
    // Frappe REST API uses limit_page_length and limit_start for pagination
    if (page_length && Number(page_length) > 0) {
      params.push(`limit_page_length=${encodeURIComponent(page_length)}`);
    }

    if (start && Number(start) >= 0) {
      params.push(`limit_start=${encodeURIComponent(start)}`);
    }
    
    const queryString = params.length > 0 ? `?${params.join('&')}` : '';
  
    const response = await this.client.get(`${url}${queryString}`);
    return response.data.data;
  }

  async createDoc(doctype, data) {
    const url = `/api/resource/${doctype}`;
    const response = await this.client.post(url, data);
    return response.data.data;
  }

  async updateDoc(doctype, name, data) {
    const url = `/api/resource/${doctype}/${name}`;
    const response = await this.client.put(url, data);
    return response.data.data;
  }

  async deleteDoc(doctype, name) {
    const url = `/api/resource/${doctype}/${name}`;
    const response = await this.client.delete(url);
    return response.data;
  }
}

export default FrappeService;