import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksserviceService } from '../taskservice.service';
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-taskupdate',
  templateUrl: './taskupdate.component.html',
  styleUrl: './taskupdate.component.scss'
})
export class TaskupdateComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    task_name: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
    created_at: new FormControl(''),
    updated_at: new FormControl('')
});

taskId: number = 0; 

  constructor(
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private taskService: TasksserviceService
  ) {}

  ngOnInit(): void {
      // Initialize your form
      this.userForm = this.formBuilder.group({
          task_name: [''],
          description: [''],
          status: [''],
          created_at: [''],
          updated_at: ['']
      });
    

      // Get the task ID from the route parameters
      this.route.params.subscribe(params => {
          this.taskId = +params['id']; // Convert to number

          // Fetch task details using the service method
          this.taskService.getTaskDetailsById(this.taskId).subscribe(task => {
              // Set the form values with the task details
              this.userForm.patchValue({
                  task_name: task.task_name,
                  description: task.description,
                  status: task.status,
                  created_at: task.created_at,
                  updated_at: task.updated_at
              });
          });
      });
  }
  saveChanges() {
    if (this.userForm.valid) {
        // Assuming you have a service method to update the task
        this.taskService.updateTask(this.taskId, this.userForm.value).subscribe(
            (response) => {
                console.log('Task updated successfully:', response);
                // Optionally, update the UI or display a success message
            },
            (error) => {
                console.error('Error updating task:', error);
                // Handle the error, display an error message, or log it
            }
        );
    } else {
        console.error('Form is not valid');
        // Optionally, display an error message to the user
    }
}
}