import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-downloads',
  templateUrl: './recipe-downloads.component.html',
  styleUrl: './recipe-downloads.component.css'
})
export class RecipeDownloadsComponent implements OnInit {

  downloads:any=[]

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getAllDownloadsApi().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.downloads=res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
}
