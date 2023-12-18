import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiService,private router:ActivatedRoute){}
  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');  
      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        this.userForm.patchValue({
          name:res.data[0].name
        })
        
      })
    
   
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

    userUpdate(){
      if(this.userForm.valid){
        console.log(this.userForm.value);
        this.service.updateData(this.getparamid, this.userForm.value).subscribe((res)=>{
          console.log(res,'res after update==>');
          this.userForm.reset();
          this.successmsg=res;
        })
      }
      else{
        this.errormsg ='All field is required !'
        
      }
   }
  }

