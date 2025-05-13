import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css'
})
export class RegComponent {

  regForm:any
  constructor(private fb:FormBuilder, private api:ApiService, private rt:Router, private toastr:ToastrService){
    this.regForm=this.fb.group({
      username:['',[Validators.required,Validators.pattern("^[a-zA-Z _]+$"),Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]]
    })
  }

  handleSubmit(){
    console.log(this.regForm.value)
    // console.log("regForm",this.regForm.valid)
    // console.log(this.regForm.controls["username"])
    // console.log(this.regForm.controls["username"].valid)
    // console.log(this.regForm.controls["username"].touched)
    this.api.userRegisterApi(this.regForm.value).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.toastr.success("Registration successfull.")
        this.rt.navigateByUrl("/")
      },
      error:(err:any)=>{
        console.log(err)
        this.toastr.error(err.error)
      }
    })
  }

}
