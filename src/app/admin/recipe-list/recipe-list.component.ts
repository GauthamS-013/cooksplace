import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes: any = [];
  searchKey: string = '';

  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.api.getAllRecipeApi().subscribe({
      next: (res: any) => {
        this.recipes = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  handleDeleteRecipe(id: any) {
    this.api.deleteRecipeApi(id).subscribe({
      next: (res: any) => {
        this.getData();
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.warning('Something Went Wrong');
      },
    });
  }
}
