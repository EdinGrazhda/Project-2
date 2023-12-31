import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpClientJsonpModule } from '@angular/common/http';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
 providedIn: 'root'
})
export class ApiService {
 readData: any;

 constructor(private http:HttpClient) { }

 apiUrl=`http://localhost:3000/users`;
 

 getAllData():Observable<any>{
    return this.http.get(this.apiUrl);
 }

  

 createData(data:any):Observable<any>{
   console.log(data,'createapi==>');
   
   return this.http.post(`${this.apiUrl}`,data);
 }

 deleteData(id: any): Observable<any> {
  let ids = id;
  return this.http.delete(`${this.apiUrl}/${ids}`, { responseType: 'text' });
}

  updateData(data:any,id:any):Observable<any>{
    let ids = id;
    return this.http.put(`${this.apiUrl}/${ids}`,data);
  }

  getSingleData(id:any):Observable<any>{
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
 
}