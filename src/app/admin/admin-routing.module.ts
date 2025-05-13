import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent} from './users/users.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDownloadsComponent } from './recipe-downloads/recipe-downloads.component';
import { TestimoniesComponent } from './testimonies/testimonies.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,title:'Admin Dashboard'},
  {path:'userlist',component:UsersComponent,title:'User list'},
  {path:'addrecipe',component:AddRecipeComponent,title:'Add recipe'},
  {path:'editrecipe/:id',component:EditRecipeComponent,title:'Edit recipe'},
  {path:'recipelist',component:RecipeListComponent,title:'Recipe list'},
  {path:'recipedownloads',component:RecipeDownloadsComponent,title:'Recipe Downloads'},
  {path:'testimonies',component:TestimoniesComponent,title:'Testimony management'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
