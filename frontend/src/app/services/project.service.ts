import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private chttp: CommonService) { }

  getProjects() {
    return this.chttp.get('project')
  }

  getProjectById(id) {
    return this.chttp.get(`project/${id}`)
  }

  createProject(data) {
    return this.chttp.post('project', data)
  }

  updateProject(data) {
    return this.chttp.patch('project', data)
  }

  addLike(projectId) {
    return this.chttp.post('project/like', { projectId: projectId })
  }

  removeLike(projectId) {
    return this.chttp.delete('project/like', { projectId: projectId })
  }

  addComment(data) {
    return this.chttp.post('project/comment', data)
  }

  editComment(data) {
    return this.chttp.patch('project/comment', data)
  }

}
