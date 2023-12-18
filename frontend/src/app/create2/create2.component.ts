import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksserviceService } from '../taskservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create2',
  templateUrl: './create2.component.html',
  styleUrl: './create2.component.scss'
})
export class Create2Component {
  constructor(private service: TasksserviceService, private router: ActivatedRoute) {}
  errormsg: any;
  successmsg: any;
  getparamid: any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    this.service.getSingleTask(this.getparamid).subscribe((res) => {
      this.taskForm.patchValue({
        task_name: res.data[0].task_name,
        description: res.data[0].description,
        status: res.data[0].status
      });
    });
  }

  taskForm = new FormGroup({
    'task_name': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
    'status': new FormControl('To do', Validators.required)
  });

  taskSubmit() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      this.service.createTask(this.taskForm.value).subscribe((res) => {
        console.log(res, 'res==>');
        this.taskForm.reset();
        this.successmsg = res;
      });
    } else {
      this.errormsg = 'All fields are required!';
    }
  }

  taskUpdate() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      this.service.updateTask(this.getparamid, this.taskForm.value).subscribe((res) => {
        console.log(res, 'res after update==>');
        this.taskForm.reset();
        this.successmsg = res;
      });
    } else {
      this.errormsg = 'All fields are required!';
    }
  }
}

