import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
    {path:'',component:HomeComponent,title:'Cooksplace'},
    {path:'recipes',component:RecipesComponent,title:'Recipes'},
    {path:'about',component:AboutComponent,title:'About'},
    {path:'contact',component:ContactComponent,title:'Contact'},
    {path:'details/:id',component:RecipeDetailsComponent,title:'Recipe Details',canActivate:[authGuard]},
    {path:'profile',component:ProfileComponent,title:'Profile',canActivate:[authGuard]},
    {path:'savedrecipes',component:SavedRecipesComponent,title:'Saved',canActivate:[authGuard]},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'reg',component:RegComponent,title:'Register'},
    {path:'*',component:HomeComponent,title:'Cooksplace'}
];
