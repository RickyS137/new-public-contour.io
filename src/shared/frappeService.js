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
      withCredentials: true,
    });
  }

  setAuthToken(token) {
    this.authToken = token;
    if (token) {
      this.client.defaults.headers['Authorization'] = `token ${token}`;
      try { localStorage.setItem('frappe_token', token); } catch (e) {}
    } else {
      delete this.client.defaults.headers['Authorization'];
      try { localStorage.removeItem('frappe_token'); } catch (e) {}
    }
  }

  clearAuth() {
    this.authToken = null;
    delete this.client.defaults.headers['Authorization'];
    try { localStorage.removeItem('frappe_token'); } catch (e) {}
  }

  async getLoggedUser() {
    try {
      const resp = await this.client.get('/api/method/frappe.auth.get_logged_user');
      return resp.data?.message || null;
    } catch (e) {
      return null;
    }
  }

  async getDoc(doctype, name) {
    const url = `/api/resource/${doctype}/${name}`;
    const response = await this.client.get(url);
    return response.data.data;
  }

  async getList(doctype, { fields = [], page_length = 0, start = 0, limit = null, filters = [], distinct = false } = {}) {
    const url = `/api/resource/${doctype}`;
    const params = [];

    if (fields.length > 0) {
      params.push(`fields=[${fields.map(field => `"${field}"`).join(",")}]`);
    }

    if (page_length && Number(page_length) > 0) {
      params.push(`limit_page_length=${encodeURIComponent(page_length)}`);
    }

    if (start && Number(start) >= 0) {
      params.push(`limit_start=${encodeURIComponent(start)}`);
    }

    if (limit !== null) {
      params.push(`limit=${encodeURIComponent(limit)}`);
    }

    if (filters && filters.length > 0) {
      const filtersJson = JSON.stringify(filters);
      params.push(`filters=${encodeURIComponent(filtersJson)}`);
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

  async getFieldOptions(doctype, fieldname) {
    try {
      const response = await this.client.get('/api/method/gisbb_public_contour.www.react_page.index.get_field_options', {
        params: { 
          doctype: doctype,
          fieldname: fieldname 
        }
      });

      // Проверяем структуру ответа
      if (response.data && response.data.message) {
        const result = response.data.message;
        
        // Если успешно, возвращаем результат как есть
        if (result.success) {
          return result;
        } else {
          // Если ошибка, возвращаем с флагом success: false
          return {
            success: false,
            error: result.error || 'Unknown error'
          };
        }
      } else {
        // Неправильная структура ответа
        return {
          success: false,
          error: 'Invalid response structure'
        };
      }

    } catch (error) {
      console.error('Error fetching field options:', error);
      
      // Обрабатываем разные типы ошибок
      let errorMessage = 'Unknown error';
      
      if (error.response) {
        // Ошибка от сервера
        errorMessage = error.response.data?.message || error.response.statusText;
      } else if (error.request) {
        // Не получен ответ
        errorMessage = 'No response from server';
      } else {
        // Другие ошибки
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  async uploadFile(file, folder = 'Home/Attachments') {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('is_private', 0);
      formData.append('folder', folder);

      const response = await this.client.post('/api/method/upload_file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message) {
        return {
          success: true,
          file_url: response.data.message.file_url,
          file_name: response.data.message.file_name
        };
      }
      
      return {
        success: false,
        error: 'Upload failed'
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'File upload failed'
      };
    }
  }
    async uploadMultipleFiles(files, folder = 'Home/Attachments') {
    const uploadResults = [];
    
    for (const file of files) {
      const result = await this.uploadFile(file, folder);
      uploadResults.push(result);
    }
    
    return uploadResults;
  }
}

export default FrappeService;

const initialToken = (() => {
  try { return localStorage.getItem('frappe_token'); } catch (e) { return null; }
})();

export const frappe = new FrappeService({ authToken: initialToken });
