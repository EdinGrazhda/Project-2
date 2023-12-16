import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiService){}
  errormsg:any;
  successmsg:any

  ngOnInit(): void {
    
  }
  userForm=new FormGroup({
    'name': new FormControl('',Validators.required),
    'email':new FormControl('',Validators.required)

  });

    userSubmit(){
      if(this.userForm.valid){
        console.log(this.userForm.value);
        this.service.createData(this.userForm.value).subscribe((res)=>{
          console.log(res,'res==>');
          this.userForm.reset();
          this.successmsg=res;
        })
      }
      else{
        this.errormsg ='All field is required !'
        
      }
    }
}
