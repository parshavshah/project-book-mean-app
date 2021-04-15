import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public projectList = [];

  constructor(private projectService: ProjectService, private route: Router) {

  }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    if (this.projectList.length > 0) {
      this.projectList
    } else {
      this.projectService.getProjects().subscribe((data: any) => {
        this.projectList = data.data
        console.log(this.projectList)
        this.projectList
      })
    }
  }

  editProject(project) {
    this.route.navigate(['/project/update/', project._id], { state: { project: project } })
  }

  readProject(project) {
    this.route.navigate(['/project/read/', project._id])
  }

}
