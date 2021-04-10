import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm

  constructor(
    private route: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initRegisterForm()
  }

  initRegisterForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  register(form: FormGroup) {
    if (form.valid) {
      this.userService.registerUser({
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        password: form.value.password,
        email: form.value.email,
      }).subscribe((data: any) => {
        if (data.status == 200) {
          this.route.navigate(['/verify'], { queryParams: { email: form.value.email } })
        }
      })
    }
  }
}
