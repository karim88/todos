import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  routeName: string;
  options: any;

  constructor(private http: HttpClient) {
    this.routeName = 'projects';
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  /**
   * Get all projects (lists)
   */
  getProjects(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/${this.routeName}`, this.options);
  }

  /**
   * Get project by id
   * @param id
   */
  getProject(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/${this.routeName}/${id}`, this.options);
  }

  /**
   * Add new project
   * @param data
   */
  addProject(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/${this.routeName}`, JSON.stringify(data), this.options);
  }

  /**
   * Edit existing project
   * @param id
   * @param data
   */
  editProject(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/${this.routeName}/${id}`,  JSON.stringify(data), this.options);
  }

  /**
   * Deleting a project
   * @param id
   */
  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/${this.routeName}/${id}`, this.options);
  }
}
