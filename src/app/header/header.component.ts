import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  username:any=""

  constructor(private router:Router, private toastr:ToastrService){}

  ngOnInit(): void {
    if(sessionStorage.getItem("username")){
      this.username=sessionStorage.getItem("username")
    }
    else{
      this.username=""
    }
  }

  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl('/login')
    this.toastr.info("Logged out")
  }
}
