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

  createProject(data) {
    return this.chttp.post('project', data)
  }

  updateProject(data) {
    return this.chttp.patch('project', data)
  }

}