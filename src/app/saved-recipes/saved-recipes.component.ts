import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterLink],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css',
})
export class SavedRecipesComponent implements OnInit {
  recipes: any = [];
  constructor(private api: ApiService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.api.getSavedRecipeApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.recipes = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  removeItem(id:any){
    this.api.removeSavedRecipeApi(id).subscribe({
      next:(res:any)=>{
        this.getData()
      },
      error:(err:any)=>{
        console.log(err)
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
