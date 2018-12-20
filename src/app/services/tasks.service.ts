import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  routeName: string;
  options: any;

  constructor(private http: HttpClient) {
    this.routeName = 'tasks';
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  /**
   * Get all tasks (lists)
   * @param id
   */
  getTasks(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/${this.routeName}?id=${id}`, this.options);
  }

  /**
   * Get task by id
   * @param id
   */
  getTask(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/${this.routeName}/${id}`, this.options);
  }

  /**
   * Add new task
   * @param data
   */
  addTask(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/${this.routeName}`, JSON.stringify(data), this.options);
  }

  archiveTask(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/${this.routeName}/archive`, JSON.stringify(data), this.options);
  }

  /**
   * Edit existing task
   * @param id
   * @param data
   */
  editTask(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/${this.routeName}/${id}`,  JSON.stringify(data), this.options);
  }

  /**
   * Deleting a task
   * @param id
   */
  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/${this.routeName}/${id}`, this.options);
  }
}
