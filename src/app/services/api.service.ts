import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient ) { }

  baseUrl = environment.baseUrl;

  signin(obj): Observable<any> {
    obj.action = "login";
    return this.http.post(this.baseUrl + '/common/login', obj);
  }

  signup(obj): Observable<any> {
    obj.action = "register";
    return this.http.post(this.baseUrl + '/common/register', obj);
  }

  getUsers(obj): Observable<any> {
    obj.action = "getUsers";
    return this.http.post(this.baseUrl + '/admin/getUsers', obj);
  }

  addUsers(obj): Observable<any> {
    obj.action = "addUsers";
    return this.http.post(this.baseUrl + '/admin/addUsers', obj);
  }

  updateUser(obj): Observable<any> {
    obj.action = "updateUser";
    return this.http.post(this.baseUrl + '/admin/updateUser', obj);
  }

  deleteUser(obj): Observable<any> {
    obj.action = "deleteUser";
    return this.http.post(this.baseUrl + '/admin/deleteUser', obj);
  }

  getUserById(obj): Observable<any> {
    obj.action = "getUserById";
    return this.http.post(this.baseUrl + '/admin/getUserById', obj);
  }

  verifyByEmail(obj): Observable<any> {
    obj.action = "verifyEmail";
    return this.http.post(this.baseUrl + '/common/verifyEmail', obj);
  }

}
