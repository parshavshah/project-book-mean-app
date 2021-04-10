import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private chttp: CommonService) { }

  registerUser(data) {
    return this.chttp.post('user/register', data)
  }

  loginUser(data) {
    return this.chttp.post('user/login', data)
  }

  verifyUser(data) {
    return this.chttp.post('user/verify', data)
  }


}
