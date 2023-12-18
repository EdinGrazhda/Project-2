import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpClientJsonpModule } from '@angular/common/http';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
 providedIn: 'root'
})
export class TasksserviceService {
  assignTaskToUser(assignmentData: { taskId: number; userId: number; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/assign-task`, assignmentData);
}
 readData: any;

 constructor(private http:HttpClient) { }

 apiUrl=`http://localhost:3000/tasks`;
 

 getAllTasks():Observable<any>{
    return this.http.get(this.apiUrl);
 }
  

 createTask(data: any): Observable<any> {
  console.log(data, 'createtask==>');
  return this.http.post(`${this.apiUrl}`, data); 
}

 deleteData(id: any): Observable<any> {
  let ids = id;
  return this.http.delete(`${this.apiUrl}/${ids}`, { responseType: 'text' });
}

  updateTask(data:any,id:any):Observable<any>{
    let ids = id;
    return this.http.put(`${this.apiUrl}/${ids}`,data);
  }

  getSingleTask(id:any):Observable<any>{
    let ids = id;
    return this.http.get(`${this.apiUrl}/${ids}`)
  }

  assignTask(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/assign-task`, data);
  }
 
  getUserTasks(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-tasks/${userId}`);
  }
 
  updateTaskStatus(id: any, status: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-task-status/${id}`, { status });
  }
 
  getTasksByStatus(status: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks-by-status/${status}`);
  }

  getTaskDetailsById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
}

 
 }
