import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-manage-comment',
  templateUrl: './manage-comment.component.html',
  styleUrls: ['./manage-comment.component.css']
})
export class ManageCommentComponent implements OnInit {

  @Output() commentAddedEvent = new EventEmitter<string>();
  @Input() projectId: string;
  commentForm

  constructor(private projectService: ProjectService, private route: Router) { }

  ngOnInit(): void {
    this.initProjectCommentForm()
  }

  initProjectCommentForm() {
    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required)
    });
  }

  addComment(form: FormGroup) {
    if (form.valid) {
      let commentData = {
        comment: form.value.comment,
        projectId: this.projectId
      }
      this.projectService.addComment(commentData).subscribe((data: any) => {
        if (data.status == 200) {
          this.commentAddedEvent.emit("true")

        }

      })
      this.commentForm.reset()
    }
  }

}
