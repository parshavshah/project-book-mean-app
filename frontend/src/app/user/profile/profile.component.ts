import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public projectList = [];
  public user;

  constructor(
    private projectService: ProjectService,
    private route: Router,
    public authService: AuthService,
    public userService: UserService) { }

  ngOnInit(): void {
    this.getMyProfile()
    this.getMyProjects()
  }

  getMyProfile() {
    this.userService.getMyProfile(this.authService.user._id).subscribe((data: any) => {
      this.user = data.data
    })
  }

  getMyProjects() {
    if (this.projectList.length > 0) {
      this.projectList
    } else {
      this.projectService.getMyProjects().subscribe((data: any) => {
        this.projectList = data.data
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
