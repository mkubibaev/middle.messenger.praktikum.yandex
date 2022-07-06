enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type RequestOptions = {
  method: METHOD;
  headers: [string, string][];
  data?: any;
  timeout?: number
};

export default class HttpClient {
  public get(url: string, options: RequestOptions): Promise<XMLHttpRequest> {
    const queryString = options.data ? url + this.queryStringify(options.data) : url;
    return this.request(queryString, { ...options, method: METHOD.GET }, options.timeout);
  }

  public post(url: string, options: RequestOptions): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.POST }, options.timeout);
  }

  public put(url: string, options: RequestOptions): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PUT }, options.timeout);
  }

  public delete(url: string, options: RequestOptions): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);
  }

  private request(url: string, options: RequestOptions, timeout = 5000): Promise<XMLHttpRequest> {
    const { method, headers, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = () => { resolve(xhr); };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (headers) {
        headers.forEach((header) => xhr.setRequestHeader(...header));
      }
      xhr.timeout = timeout;

      if (method === METHOD.GET) {
        xhr.send();
      } else {
        xhr.send(data);
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
