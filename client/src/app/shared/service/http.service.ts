import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private endPoint: string = environment.apiEndPoint;

  constructor(
    private http: HttpClient
  ) { }

  get(url: string, option?) {
    return this.http.get(this.endPoint + url, option);
  }

  post(url: string, body: {}, option?) {
    return this.http.post(this.endPoint + url, body, option);
  }

  delete(url:string, option?) {
    return this.http.delete(this.endPoint + url, option);
  }
}
