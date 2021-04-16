import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { ManageCommentComponent } from '../manage-comment/manage-comment.component';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  projectId
  project
  @ViewChild(ManageCommentComponent)
  private manageComment: ManageCommentComponent
  commentEdit = false

  constructor(private route: ActivatedRoute,
    private projectService: ProjectService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.loadProject()
  }

  loadProject() {
    this.projectService.getProjectById(this.projectId).subscribe((data: any) => {
      this.project = data.data[0]
    })
  }

  isLikedProject() {
    if (this.project.likes.includes(this.authService.user._id)) {
      return true
    }
    return false
  }

  addProjectLike() {
    this.projectService.addLike(this.projectId).subscribe((data: any) => {
      if (data.status === 200) {
        this.loadProject()
      }
    })
  }

  removeProjectLike() {
    this.projectService.removeLike(this.projectId).subscribe((data: any) => {
      if (data.status === 200) {
        this.loadProject()
      }
    })
  }

  addComment(data) {
    if (data == "true") {
      this.loadProject();
      this.commentEdit = false
      let el = document.getElementById("project");
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  editComment(comment) {
    this.commentEdit = true
    let el = document.getElementById("commentEl");
    el.scrollIntoView({ behavior: 'smooth' });
    this.manageComment.initupdateCommentForm(comment._id, comment.body)
  }

  isSameUser(comment) {
    return this.authService.user._id == comment.userId._id
  }

}
