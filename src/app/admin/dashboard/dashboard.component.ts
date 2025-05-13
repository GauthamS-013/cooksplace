import { Component,model } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { OnInit } from '@angular/core';
import Highcharts from 'highcharts/es-modules/masters/highcharts.src';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  toggle:boolean=true;
  recipeCount:any=0
  userCount:any=0
  downloadCount:any=0
  requestCount:any=0
  selected = model<Date | null>(null);

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = { };

  constructor(private api:ApiService,private toastr:ToastrService,private router:Router){
    this.chartOptions ={
      chart:{
        type:'bar'
      },
      title:{
        text:'Analysis of Download Recipes Based on Cuisine',
        align:'center'
      },
      xAxis:{
        type:'category'
    },
    yAxis:{
      title:{
        text:'Total Downlod Recipe Count'
      }
    },
    legend:{
      enabled:true
    },
    credits:{
      enabled:true
    },
    series:[
      {
        name:'Cuisine',
        colorByPoint:true,
        type:'bar',
        data:[
          {name:"Italian",y:4},
          {name:"Asian",y:2},
          {name:"Thai",y:1}
        ]
      }
    ]
    }
  }

  ngOnInit(): void {
    this.getRecipeCount()
    this.getUsersCount()
    this.getDownloadCount()
    this.getTestimonyRequestCount()
  }

  handletoggle(){
    this.toggle=!this.toggle
  }

  getRecipeCount(){
    this.api.getAllRecipeApi().subscribe((res:any)=>{
      this.recipeCount=res.length
    })
  }

  getUsersCount(){
    this.api.getAllUsersApi().subscribe((res:any)=>{
      this.userCount=res.length
    })
  }

  getDownloadCount(){
    this.api.getAllDownloadsApi().subscribe((res:any)=>{
      console.log(res)
      this.downloadCount=res.reduce((prev:any,item:any)=>prev+item.count,0)
    })
  }

  getTestimonyRequestCount(){
    this.api.getAllTestimoniesApi().subscribe((res:any)=>{
      const requests=res.filter((item:any)=>item.status=="pending")
      this.requestCount=requests.length
    })
  }

  logout(){
    sessionStorage.clear()
    this.toastr.info("Logged out from Admin Panel")
    this.router.navigateByUrl('/')
  }

}