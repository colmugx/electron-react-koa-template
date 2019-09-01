import fetch from 'node-fetch';

export interface PlainObject {
  [key: string]: any;
}

interface IOption extends PlainObject {
  noloading?: boolean;
}

export interface IRequest {
  get(url: string, data: PlainObject, option?: any);
  post(url: string, data: PlainObject, option?: any);
  put(url: string, data: PlainObject, option?: any);
  delete(url: string, data: PlainObject, option?: any);
}

export type HttpMethods =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';

const adapter = (adapter): IRequest => {
  const _methods: HttpMethods[] = ['GET', 'POST', 'PUT', 'DELETE'];

  const requests: IRequest = _methods.reduce(
    (prev, method) => {
      const http = (url: string, data: PlainObject, option?: IOption) => {
        const _option: IOption = { ...option };

        const config = {
          headers: {
            'content-type':
              method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json',
          },
          data,
          method,
          ..._option,
        };

        const p = new Promise(async (resolve, reject) => {
          try {
            const res = await adapter(url, config);
            const data = await res.json();
            handleError(data);
            resolve(data);
          } catch (e) {
            reject(e);
          }
        });

        return p;
      };

      return {
        ...prev,
        [method.toLowerCase()]: http,
      };
    },
    {} as IRequest,
  );

  return requests;

  function handleError(res) {
    if (res.data) {
      const code = res.data.code;
      if (code >= 400) {
        throw Error('NETWORK ERROR.');
      }
      if (code === 401) {
        throw Error('LOGIN TIMEOUT');
      }
      if (code === 403) {
        throw Error('CONNECT ERROR');
      }
    }
  }
};

export default adapter(fetch);
