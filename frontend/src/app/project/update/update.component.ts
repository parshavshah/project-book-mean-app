import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private route: Router, private projectService: ProjectService) {
    if (this.route.getCurrentNavigation().extras.state) {
      const data = this.route.getCurrentNavigation().extras.state
      this.project = data.project
    }
  }

  project
  projectForm

  ngOnInit(): void {
    this.initProjectForm()
  }

  initProjectForm() {
    this.projectForm = new FormGroup({
      title: new FormControl(this.project.title, Validators.required),
      body: new FormControl(this.project.body, Validators.required),
    });
  }

  update(form: FormGroup) {
    if (form.valid) {
      this.projectService.updateProject({
        _id: this.project._id,
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
