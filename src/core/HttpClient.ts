enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type RequestOptions = {
  headers?: Record<string, string>;
  data?: any;
  timeout?: number
};

type RequestOptionsWithMethod = RequestOptions & {
  method: METHODS;
};

type XHRResponse<T> = {
  data: T;
  status: number
};

type HTTPMethod = <T>(url: string, options?: RequestOptions) => Promise<XHRResponse<T>>;

export default class HttpClient {
  private apiUrl = '';

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  get: HTTPMethod = (url, options = {}) => {
    const queryString = options.data ? url + this.queryStringify(options.data) : url;
    return this.request(queryString, { ...options, method: METHODS.GET }, options.timeout);
  };

  post: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.POST }, options.timeout)
  );

  put: HTTPMethod = (url: string, options = {}) => (
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
  );

  delete: HTTPMethod = (url: string, options: RequestOptions = {}) => (
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
  );

  private request<T>(url: string, options: RequestOptionsWithMethod, timeout = 10000): Promise<XHRResponse<T>> {
    const resultUrl = this.apiUrl + url;
    const { method, headers, data } = options;

    return new Promise<XHRResponse<T>>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, resultUrl);

      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.setRequestHeader('accept', 'application/json');
      xhr.responseType = 'json';
      xhr.withCredentials = true;
      xhr.timeout = timeout;
      xhr.onload = () => resolve({
        status: xhr.status,
        data: xhr.response,
      });
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }

  private queryStringify(data: { [key: string]: unknown }) {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
  }
}
