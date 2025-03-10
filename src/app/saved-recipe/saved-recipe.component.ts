import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipe',
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './saved-recipe.component.html',
  styleUrl: './saved-recipe.component.css'
})
export class SavedRecipeComponent {

  // create a property to store array of saved recipes
  allrecipes:any=[]
  // api service dependency injection
  constructor(private api:ApiService){}
  // call the function inside ngOnInit()
  ngOnInit(){
    this.getAllSavedRecipes()
  }
  // define function to call api
  getAllSavedRecipes(){
    this.api.getUserSavedRecipeApi().subscribe((res:any)=>{
      this.allrecipes=res
      console.log(this.allrecipes);
      
    })
  }

  // delete saved recipe
  removeSavedRecipe(id:string){
    this.api.deleteSavedRecipeApi(id).subscribe((res:any)=>{
    this.getAllSavedRecipes()
    })
  }

}