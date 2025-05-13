import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { error } from 'console';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent implements OnInit {
  rid: any;
  recipe: any = {};
  downloadCount:any=0

  constructor(
    private api: ApiService,
    private ac: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.ac.params.subscribe({
      next: (res: any) => {
        console.log(res);
        this.rid = res.id;
      },
    });
  }
  ngOnInit(): void {
    this.getData();
    this.getCount()
  }

  getCount(){
    this.api.getDownloadCountApi(this.rid).subscribe({
      next:(res:any)=>{
        console.log(res.count)
        this.downloadCount=res.count
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  getData() {
    this.api.getRecipeWithIdApi(this.rid).subscribe({
      next: (res: any) => {
        console.log(res);
        this.recipe = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  handleSaveRecipe(recipe: any) {
    const { id, name, cuisine, image } = recipe;
    this.api.saveRecipeApi({ id, name, cuisine, image }).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success('Recipe saved.');
      },
      error: (err: any) => {
        console.log(err);
        if (err.error) {
          this.toastr.warning(err.error);
        } else {
          this.toastr.error('Saving failed.');
        }
      },
    });
  }

  handleDownloadPdf() {
    const doc = new jsPDF();

    // const head=[['Recipe',this.recipes.name]]

    const body = [
      ['Cuisine', this.recipe.cuisine],
      ['Difficulty', this.recipe.difficulty],
      ['Preperation time', this.recipe.prepTimeMinutes],
      ['Cooking time', this.recipe.cookTimeMinutes],
      ['Calories Per Serving', this.recipe.caloriesPerServing],
      ['Ingredients', this.recipe.ingredients.join('\n')],
      ['Instructions', this.recipe.instructions.join('\n')],
    ];

    autoTable(doc, {
      body,
    });

    doc.text(this.recipe.name, 10, 10);
    doc.save(`${this.recipe.name}-recipe.pdf`);

    this.api
      .addDownloadCountApi({ id: this.recipe.id, name: this.recipe.name })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.getCount()
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
}
