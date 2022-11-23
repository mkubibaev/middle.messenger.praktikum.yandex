enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface RequestOptions {
  headers?: Record<string, string>;
  data?: any;
  timeout?: number
}

interface RequestOptionsWithMethod extends RequestOptions {
  method: METHOD;
}

export default class HttpClient {
  private apiUrl = '';

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  public get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const queryString = options.data ? url + this.queryStringify(options.data) : url;
    return this.request(queryString, { ...options, method: METHOD.GET }, options.timeout);
  }

  public post<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request(url, { ...options, method: METHOD.POST }, options.timeout);
  }

  public put<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request(url, { ...options, method: METHOD.PUT }, options.timeout);
  }

  public delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);
  }

  private request<T>(url: string, options: RequestOptionsWithMethod, timeout = 10000): Promise<T> {
    const resultUrl = this.apiUrl + url;
    const { method, headers, data } = options;

    return new Promise<T>((resolve, reject) => {
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
      xhr.onload = () => resolve(xhr.response);
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET) {
        xhr.send();
      } else {
        if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.send(JSON.stringify(data));
        }
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
