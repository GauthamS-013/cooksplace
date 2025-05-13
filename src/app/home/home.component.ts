import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  recipeList: any = [];
  testimonies: any=[]

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getRecipe();
    this.getTestimony()
  }

  getRecipe() {
    this.api.getAllRecipeApi().subscribe((res: any) => {
      this.recipeList = res.slice(0, 5);
    });
  }

  getTestimony(){
    this.api.getApprovedTestimoniesApi().subscribe((res:any)=>{
      this.testimonies=res
    })
  }
}
