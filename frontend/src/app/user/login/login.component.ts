import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm
  userEmail

  constructor(
    private route: Router,
    private userService: UserService,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.userEmail = params.email
    })
    this.initVerifyForm()
  }

  initVerifyForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(this.userEmail, [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  login(form: FormGroup) {
    if (form.valid) {
      this.userService.loginUser({
        password: form.value.password,
        username: form.value.email,
      }).subscribe((data: any) => {
        localStorage.setItem('authToken', data.data);
        if (data.status == 200) {
          this.route.navigate(['/projects'])
        }
      })
    }
  }

}