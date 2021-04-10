import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  projectForm

  constructor(
    private route: Router,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.initProjectForm()
  }

  initProjectForm() {
    this.projectForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
  }

  create(form: FormGroup) {
    if (form.valid) {
      this.projectService.createProject({
        title: form.value.title,
        body: form.value.body,
        hidden: false
      }).subscribe((data: any) => {
        if (data.status == 200) {
          this.route.navigate(['/projects'])
        }
      })
    }
  }

}
