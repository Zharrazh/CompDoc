import { Observable } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { stringify } from 'query-string';

import { history } from './history';
import { store } from './store';

const baseUrl = 'http://localhost:5000/api';

class HttpWrapper {
  private _header = {
    'Content-Type': 'application/json'
  };

  private _getHeader(current?: {}) {
    const authInfo = store.getState().auth.authInfo;
    return authInfo.isAuth
      ? { ...this._header, Authorization: 'Bearer ' + authInfo.token, ...current }
      : { ...this._header, ...current };
  }

  private _handleErrors(e: AjaxError) {
    switch (e.status) {
      case 401:
        history.push('/login');
        break;
      case 403:
        history.push('/accessdenied');
        break;
      case 404:
        history.push('/notfound');
        break;
    }
  }

  private _getUrl(url: string, params?: { [key: string]: any }) {
    return params != null ? `${baseUrl}\\${url}?${stringify(params)}` : `${baseUrl}\\${url}`;
  }

  public get<T>(url: string, params?: { [key: string]: any }, header?: {}): Observable<T> {
    return ajax.get(this._getUrl(url, params), this._getHeader(header)).pipe(
      map(x => x.response),
      catchError(e => {
        this._handleErrors(e);
        throw e;
      })
    );
  }

  public post<T>(url: string, data: {}, params?: { [key: string]: any }, header?: {}): Observable<T> {
    return ajax.post(this._getUrl(url, params), data, this._getHeader(header)).pipe(
      map(x => x.response),
      catchError(e => {
        this._handleErrors(e);
        throw e;
      })
    );
  }
}

export const http = new HttpWrapper();
