import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl = ''
  token = ''

  url: string;
  constructor(public http: HttpClient) {
    this.baseUrl = environment.apiRoute;
  }

  post(apiRoute: string, body: any) {
    return this.http.post(`${this.baseUrl + apiRoute}`, body, { headers: this.getHttpHeaders() });
  }

  get(apiRoute: string) {
    return this.http.get(`${this.baseUrl + apiRoute}`, { headers: this.getHttpHeaders() });
  }

  put(apiRoute: string, body: any) {
    return this.http.put(`${this.baseUrl + apiRoute}`, body, { headers: this.getHttpHeaders() });
  }

  delete(apiRoute: string, body: any) {
    return this.http.delete(`${this.baseUrl + apiRoute}`, { headers: this.getHttpHeaders(), params: body });
  }

  patch(apiRoute: string, body: any) {
    return this.http.patch(`${this.baseUrl + apiRoute}`, body, { headers: this.getHttpHeaders() });
  }

  getHttpHeaders(): HttpHeaders {
    if (!this.token) {
      this.token = localStorage.getItem("authToken");
    }
    if (this.token) {
      return new HttpHeaders().set("authorization", this.token);
    } else {
      return
    }
  }
}
