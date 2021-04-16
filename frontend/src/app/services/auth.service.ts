import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  isLoggedIn = false
  user = null

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedData = jwt_decode(token)
      this.user = decodedData['data']
    }
    this.isLoggedIn = !this.jwtHelper.isTokenExpired(token);
    return this.isLoggedIn
  }


}
