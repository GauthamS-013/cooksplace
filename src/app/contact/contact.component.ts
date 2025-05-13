import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ReactiveFormsModule,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  testForm:any

  constructor(private fb:FormBuilder,private api:ApiService, private toastr:ToastrService,private rt:Router){
    this.testForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      testimony: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  handleTestimony(){
    console.log(this.testForm.value)
    this.api.addTestimonyApi(this.testForm.value).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.toastr.success("Testimony added successfully.")
        this.rt.navigateByUrl('/')
      },
      error:(err:any)=>{
        console.log(err)
        if(err.error){
          this.toastr.error(err.error)
        }
        else{
          this.toastr.error("Something went wrong.")
        }
      }
    })
  }
}
