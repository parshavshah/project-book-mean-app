import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {

  }

  projectId
  project

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.loadProject()
  }

  loadProject() {
    this.projectService.getProjectById(this.projectId).subscribe((data: any) => {
      this.project = data.data[0]
    })
  }

  addProjectLike() {
    this.projectService.addLike(this.projectId).subscribe((data: any) => {
      if (data.status === 200) {
        this.loadProject()
      }
    })
  }

  addComment(data) {
    if (data == "true") {
      this.loadProject();
    }
  }

}
