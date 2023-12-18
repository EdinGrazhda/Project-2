import { Component, OnInit, ViewChild } from '@angular/core';
import { TasksserviceService } from '../taskservice.service';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms'
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})

export class TaskDetailsComponent implements OnInit {
  readData: any;
  successmsg: any;
  userId: any;  // Add this line
  selectedUser: any;
  errormsg: any;
  

  constructor(private service: TasksserviceService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.getAllData();
    });
  }

  taskForm = new FormGroup({
    'task_name': new FormControl('', Validators.required),
    'user_name': new FormControl('', Validators.required),
    'descripton': new FormControl('', Validators.required),
    'status': new FormControl('To do', Validators.required),
    'created_at': new FormControl('', Validators.required),
    'updated_at': new FormControl('', Validators.required),
  });

  getAllData(){
    this.service.getAllTasks().subscribe((res)=>{
      console.log(res,'res==>');
      this.readData=res
    })
   }

   

  getUserTasks() {
    this.service.getUserTasks(this.userId).subscribe(
      (res) => {
        this.readData = res;
      },
      (error) => {
        console.error('Error getting user tasks:', error);
      }
    );
  }

  updateTaskStatus(taskId: any, status: any) {
    this.service.updateTaskStatus(taskId, status).subscribe(
      () => {
        this.successmsg = 'Task status updated successfully.';
        this.getUserTasks();
      },
      (error) => {
        console.error('Error updating task status:', error);
      }
    );
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
   
   taskAssign() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      this.service.assignTask(this.taskForm.value).subscribe(
        (res) => {
          console.log(res, 'res==>');
          this.taskForm.reset();
          this.successmsg = 'Task assigned successfully.';
        },
        (error) => {
          console.error('Error assigning task:', error);
          this.errormsg = 'Error assigning task.';
        }
      );
    } else {
      this.errormsg = 'All fields are required!';
    }
  }
}

   

  




