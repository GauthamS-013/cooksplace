import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import {NgxPaginationModule} from 'ngx-pagination'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,SearchPipe,NgxPaginationModule,RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  recipeList:any=[]
  cuisineArray:any=[]
  mealtypeArray:any=[]
  dummyrecipeList:any=[]
  searchKey:string=""
  p:number=1

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getRecipe()
  }

  getRecipe(){
    this.api.getAllRecipeApi().subscribe((res:any)=>{
      this.recipeList=res
      this.dummyrecipeList=res

      this.recipeList.forEach((item:any) => {
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
      });

      this.recipeList.forEach((item:any)=>{
        item.mealType.forEach((item:any)=>{
          !this.mealtypeArray.includes(item) && this.mealtypeArray.push(item)
        })
      })
      
    })
  }

  filterAllRecipe(key:string,value:string){
    this.recipeList=this.dummyrecipeList.filter((item:any)=>item[key]==value)
  }
}
