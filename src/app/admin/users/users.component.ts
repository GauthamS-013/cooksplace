import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users:any=[]

  constructor( private api:ApiService ){}

  ngOnInit(): void {
    this.api.getAllUsersApi().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.users=res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
}
