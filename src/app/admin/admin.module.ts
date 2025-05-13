import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeDownloadsComponent } from './recipe-downloads/recipe-downloads.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { TestimoniesComponent } from './testimonies/testimonies.component';
import { UsersComponent } from './users/users.component';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HighchartsChartModule } from 'highcharts-angular'
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DashboardComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    RecipeDownloadsComponent,
    RecipeListComponent,
    TestimoniesComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterLink,
    SearchPipe,
    FormsModule,
    MatCardModule,
    MatDatepickerModule,MatNativeDateModule,
    HighchartsChartModule
  ]
})
export class AdminModule { }
