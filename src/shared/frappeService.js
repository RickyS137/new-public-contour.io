import axios from 'axios';

// Normalize and choose a sensible base URL at runtime.
const ENV_BASE = process.env.REACT_APP_BASE_URL;
const ENV_PUBLIC = process.env.REACT_APP_BASE_URL_PUBLIC;

function normalizeBaseUrl(url) {
  if (!url) return null;
  try {
    return String(url).trim().replace(/\/+$/, '');
  } catch (e) {
    return url;
  }
}

const BASE_URL = normalizeBaseUrl(ENV_BASE) || normalizeBaseUrl(ENV_PUBLIC) || (typeof window !== 'undefined' ? window.location.origin : '');

class FrappeService {
  constructor({ baseUrl = BASE_URL, authToken = null } = {}) {
    // allow caller override, but normalize any provided value
    this.baseUrl = normalizeBaseUrl(baseUrl) || BASE_URL;
    this.authToken = authToken;
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: this.authToken
        ? { Authorization: `token ${this.authToken}` }
        : {},
      withCredentials: true,
    });
    this._sessionRefreshIntervalId = null;
    this._setupInterceptors();
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

  _setupInterceptors() {
    // Interceptor to try refreshing session on 401 and retry the original request once
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (!originalRequest) return Promise.reject(error);

        const status = error.response?.status;
        if (status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshed = await this.refreshSession();
          if (refreshed) {
            // retry original request with same config
            return this.client(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Refreshes the session by hitting a lightweight authenticated endpoint.
   * Returns true if user is still logged in (and cookie refreshed), false otherwise.
   */
  async refreshSession() {
    try {
      const resp = await this.client.get('/api/method/frappe.auth.get_logged_user');
      return !!(resp.data && resp.data.message);
    } catch (e) {
      return false;
    }
  }

  /**
   * Start periodic session refresh. Interval defaults to 5 minutes.
   */
  startSessionRefresh(intervalMs = 5 * 60 * 1000) {
    try {
      if (this._sessionRefreshIntervalId) return;
      // run immediately once, then schedule
      this.refreshSession().catch(() => {});
      this._sessionRefreshIntervalId = setInterval(() => {
        this.refreshSession().catch(() => {});
      }, intervalMs);
    } catch (e) {
      // ignore
    }
  }

  stopSessionRefresh() {
    if (this._sessionRefreshIntervalId) {
      clearInterval(this._sessionRefreshIntervalId);
      this._sessionRefreshIntervalId = null;
    }
  }

  clearAuth() {
    this.authToken = null;
    delete this.client.defaults.headers['Authorization'];
    try { localStorage.removeItem('frappe_token'); } catch (e) {}

    try { this.stopSessionRefresh(); } catch (e) {}

    try {
      this.client.get('/api/method/logout').catch(() => {});
    } catch (e) {}

    try {
      if (typeof document !== 'undefined' && document.cookie) {
        const cookies = document.cookie.split(';').map(c => c.split('=')[0].trim()).filter(Boolean);
        const expire = 'Thu, 01 Jan 1970 00:00:00 GMT';
        const path = 'Path=/;';
        const domain = typeof window !== 'undefined' ? `Domain=${window.location.hostname};` : '';
        cookies.forEach(name => {
          try {
            document.cookie = `${name}=; ${path} Expires=${expire};`;
            if (domain) document.cookie = `${name}=; ${path} ${domain} Expires=${expire};`;
          } catch (e) {}
        });
      }
    } catch (e) {
      // ignore cookie deletion errors
    }
  }

  async getLoggedUser() {
    try {
      const resp = await this.client.get('/api/method/frappe.auth.get_logged_user');
      const booleanUser = !!(resp.data?.message !== 'Guest');
      return booleanUser
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
      const response = await this.client.get('/api/method/gisbb_public_contour.www.public.index.get_field_options', {
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

  async getMicrofloraCount() {
    try {
      const response = await this.client.get('/api/method/gisbb_public_contour.www.public.index.get_microflora_count');      
      return response.data?.message?.total_flora ?? null;
    } catch (error) {
      console.error('Error fetching microflora count:', error);
      return null;
    }
  }

  async getMicroflora(filters = {}, page = 1, page_length = 20) {
    try {
      const response = await this.client.get('/api/method/gisbb_public_contour.www.public.index.get_microflora', {
        params: {
          filters: JSON.stringify(filters),
          page,
          page_length
        }
      });
      console.log(response);
      

      return response.data?.message ?? {};
    } catch (error) {
      console.error('Error fetching microflora list:', error);
      return { flora: [], total_count: 0};
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
