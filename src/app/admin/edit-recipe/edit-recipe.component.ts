import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { OnInit } from '@angular/core';
import { RecipeModel } from '../Model/recipe.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent implements OnInit {
  
  recipeId:any=""
  cuisineArray: any = [];
  difficultyArray: any = [];
  mealTypeArray: any = [];
  recipeData: RecipeModel = {};
  ingredients: any = [];
  instructions: any = [];
  mealTypes: any = [];
  obId:any=""

  constructor(private api: ApiService,private toastr: ToastrService, private router:Router, private ac:ActivatedRoute) {
    this.ac.params.subscribe({
      next:(res:any)=>{
        this.recipeId=res.id
        console.log(this.recipeId)
      }
    })
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.api.getAllRecipeApi().subscribe({
      next: (res: any) => {
        res.forEach((item: any) => {
          !this.cuisineArray.includes(item.cuisine) &&
            this.cuisineArray.push(item.cuisine);
          !this.difficultyArray.includes(item.difficulty) &&
            this.difficultyArray.push(item.difficulty);

          item.mealType.forEach((item: any) => {
            !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item);
          });
        });
        console.log(this.mealTypeArray);
      },
      error: (err: any) => {},
    });
    this.api.getRecipeWithIdApi(this.recipeId).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.recipeData=res
        this.ingredients=res?.ingredients
        this.instructions=res?.instructions
        this.mealTypes=res?.mealType
        this.obId=res?._id
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  addIngredients(ing: any) {
    if (ing.value) {
      this.ingredients?.push(ing.value);
      ing.value = '';
      console.log(this.ingredients);
    }
  }

  removeIngredients(val: any) {
    this.ingredients = this.ingredients.filter((item: any) => item != val);
  }

  addInstructions(ins: any) {
    if (ins.value) {
      this.instructions?.push(ins.value);
      ins.value = '';
    }
  }

  removeInstructions(val: any) {
    this.instructions = this.instructions.filter((item: any) => item != val);
  }

  getmealTypes(mt: any) {
    if (mt.target.checked) {
      this.mealTypes.push(mt.target.name);
    } else {
      this.mealTypes = this.mealTypes.filter(
        (item: any) => item != mt.target.name
      );
    }
  }

  handleSubmit() {
    this.recipeData.mealType = this.mealTypes;
    this.recipeData.instructions = this.instructions;
    this.recipeData.ingredients = this.ingredients;

    const {
      name,
      ingredients,
      instructions,
      PrepTimeMinutes,
      cookTimeMinutes,
      servings,
      difficulty,
      cuisine,
      caloriesPerServing,
      mealType,
      image,
    } = this.recipeData;
    if (
      name &&
      ingredients!.length > 0 &&
      instructions!.length > 0 &&
      PrepTimeMinutes &&
      cookTimeMinutes &&
      servings &&
      difficulty &&
      cuisine &&
      caloriesPerServing &&
      image &&
      mealType!.length > 0
    ) {
      this.api.updateRecipeApi(this.obId,this.recipeData).subscribe({
        next:(res:any)=>{
          this.toastr.success("Recipe edited.")
          this.ingredients=[]
          this.instructions=[]
          this.mealTypes=[]
          this.recipeData={}
          this.router.navigateByUrl('/admin/recipelist')
        },
        error:(err:any)=>{
          if(err.error){
            this.toastr.error(err.error)
          }else{
            this.toastr.error("Recipe updation failed.")
          }
        }
      })
    }
    else{
      this.toastr.warning("Please fill all inputs.")
    }
  }

}
