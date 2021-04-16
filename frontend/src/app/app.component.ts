import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'frontend';


  constructor(private titleService: Title, public authService: AuthService, private route: Router) {

  }

  setDocTitle(title: string) {
    this.titleService.setTitle(title);
  }

  logout() {
    localStorage.removeItem('authToken')
    this.authService.isAuthenticated()
    this.route.navigate(['/login'])
  }
}
