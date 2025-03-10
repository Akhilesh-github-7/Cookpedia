import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {
  @Input() id !:string
  cusineArray:any = []
  mealTypeArray:any=[]
  recipeDetails:RecipeModel ={}
  ingredientArray:any=[]
  instructionArray:any=[]
  mealArray:any=[]


  constructor(private api:ApiService, private router:Router){}

  ngOnInit(){
    this.getAllRecipes()
   }
  
   getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      if(this.id){
        this.recipeDetails = res.find((item:any)=>item._id==this.id)
        this.ingredientArray = this.recipeDetails.ingredients
        this.instructionArray = this.recipeDetails.instructions
        this.mealArray = this.recipeDetails.mealType
      }
      
      res.forEach((item:any) => {
        !this.cusineArray.includes(item.cuisine) && this.cusineArray.push(item.cuisine)
      })

      console.log(this.cusineArray);
      const dummyMeal = res.map((item:any)=>item.mealType)
      // console.log(dummyMeal.flat(Infinity));
      const flatDummyMealArray = dummyMeal.flat(Infinity)
      flatDummyMealArray.forEach((item:any)=>{
        !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)

      })
      console.log(this.mealTypeArray);  
    })
  }

addIngredients(input:any){
      if(input.value){
        this.ingredientArray.push(input.value)
        input.value = ""
        console.log(this.ingredientArray);
        
      }
}
removeIngredient(value:string){
  this.ingredientArray = this.ingredientArray.filter((item:String)=>item!=value)
}



addInstruction(input:any){
  if(input.value){
    this.instructionArray.push(input.value)
    input.value = ""
    console.log(this.instructionArray);
    
  }
}
removeInstruction(value:string){
this.instructionArray = this.instructionArray.filter((item:String)=>item!=value)
}

mealTypeSelect(event:any){
  if(event.target.checked){
    !this.mealArray.includes(event.target.name) &&
    this.mealArray.push(event.target.name)
  }else{
    this.mealArray = this.mealArray.filter((item:String)=>item!=event.target.name)
  }
  console.log(this.mealArray);
  
}

removeMealType(meal:String){
  this.mealArray = this.mealArray.filter((item:string)=>item!=meal)
}


addRecipe(){
  console.log(this.recipeDetails);
  // 1. add ingredients, instructions and meal array to recipe details
  this.recipeDetails.ingredients = this.ingredientArray
  this.recipeDetails.instructions = this.instructionArray
  this.recipeDetails.mealType = this.mealArray
  const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails
  // 2. Check all fields have value in recipe details
  if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing &&image &&mealType!.length>0){
    // alert("proceed Api call")
    // 3. if all values present then api call
    this.api.addrecipeAPI(this.recipeDetails).subscribe({next:(res:any)=>{
      alert("recipe added successfully")
      this.recipeDetails={}
      this.ingredientArray=[]
      this.instructionArray=[]
      this.mealArray=[]
      this.router.navigateByUrl("/admin/recipe-list")
    },
    error:(reason:any)=>{
      alert(reason.error)
      this.recipeDetails.name=""
    }
  })
    
      // if api call success-- clear all fields
  }else{
    alert("Please fill the form")
    // 4. if all values are not present alert "fill form"

  }
  
  
}

editRecipe(){

  console.log(this.recipeDetails);
  // 1. add ingredients, instructions and meal array to recipe details
  this.recipeDetails.ingredients = this.ingredientArray
  this.recipeDetails.instructions = this.instructionArray
  this.recipeDetails.mealType = this.mealArray
  const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails
  // 2. Check all fields have value in recipe details
  if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing &&image &&mealType!.length>0){
    
  this.api.editrecipeAPI(this.id,this.recipeDetails).subscribe((res:any)=>{
    alert("recipe updated successfully")
      this.recipeDetails={}
      this.ingredientArray=[]
      this.instructionArray=[]
      this.mealArray=[]
      this.router.navigateByUrl("/admin/recipe-list")
  })
  }else{
    alert("Please fill the form")
    // 4. if all values are not present alert "fill form"

  }
  

}





}
