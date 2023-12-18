import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { catchError, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  
})
export class UserDetailsComponent implements OnInit {
  readData: any;
  successmsg:any;
  userId: any;  
  constructor(private service:ApiService){}
  
  ngOnInit(): void {
   this.getAllData()
  }

  deleteID(id: any) {
    this.service.deleteData(id).subscribe(
      () => {
        this.successmsg = 'Delete operation successful.';
        this.getAllData();
      },
      (error) => {
        console.error('Error deleting data:', error);
      }
    );
   }
   getAllData(){
    this.service.getAllData().subscribe((res)=>{
      console.log(res,'res==>');
      this.readData=res.data
    })
   }
   
}



