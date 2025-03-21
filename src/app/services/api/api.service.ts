import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _httpClient: HttpClient) {}

  getData(path: string): Observable<any> {
    // make request to backend
    /**
      this._httpClient.get(`${environment.apiUrl}/${path}`, {
        headers: {
          Authorization: environment.apiAuthKey,
        },
      });
     */
    return this._httpClient.get<any>(path);
  }
}
