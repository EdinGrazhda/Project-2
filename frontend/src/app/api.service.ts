import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpClientJsonpModule } from '@angular/common/http';
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
  
}