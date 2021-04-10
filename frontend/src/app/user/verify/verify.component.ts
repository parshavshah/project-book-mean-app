import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  verifyForm
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
    this.verifyForm = new FormGroup({
      email: new FormControl(this.userEmail, [Validators.email, Validators.required]),
      code: new FormControl('', Validators.required)
    });
  }

  verify(form: FormGroup) {
    if (form.valid) {
      this.userService.verifyUser({
        code: form.value.code,
        email: form.value.email,
      }).subscribe((data: any) => {
        if (data.status == 200) {
          this.route.navigate(['/login'], { queryParams: { email: form.value.email } })
        }
      })
    }
  }
}
