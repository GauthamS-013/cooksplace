import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule,Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  logForm: any;

  constructor(private fb: FormBuilder, private api:ApiService, private rt:Router, private toastr:ToastrService) {
    this.logForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  handleLogin(){
    this.api.userLoginApi(this.logForm.value).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.toastr.success("Login Successful")
        sessionStorage.setItem("token",res.token)
        sessionStorage.setItem("username",res.user)
        sessionStorage.setItem("usertype",res.usertype)
        if(res.usertype=="admin"){
          this.rt.navigateByUrl("/admin")
        }else{
          this.rt.navigateByUrl("/")
        }
      },
      error:(err:any)=>{
        console.log(err)
        this.toastr.error(err.error)
      }
    })
  }
}
