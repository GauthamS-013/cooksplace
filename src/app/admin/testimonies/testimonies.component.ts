import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-testimonies',
  templateUrl: './testimonies.component.html',
  styleUrl: './testimonies.component.css'
})
export class TestimoniesComponent implements OnInit {
  testimony:any=[]

  constructor(private api:ApiService,private toastr:ToastrService){}

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.api.getAllTestimoniesApi().subscribe({
      next:(res:any)=>{
        this.testimony=res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  updateStatus(id:any,status:any){
    this.api.updateTestimonyApi(id,{status}).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.getData()
      },
      error:(err:any)=>{
        if(err.error){
          this.toastr.warning(err.error)
        }
        else{
          this.toastr.error("Something went wrong.")
        }
      }
    })
  }
}
