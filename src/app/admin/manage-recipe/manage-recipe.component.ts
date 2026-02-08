import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipeModel';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent implements OnInit {
  @Input() id!: string
  recipeForm!: FormGroup
  cusineArray: any = []
  mealTypeArray: any = []
  ingredientArray: string[] = []
  instructionArray: string[] = []
  mealArray: string[] = []
  isLoading = false;
  previewImage: string = ""

  constructor(
    private api: ApiService, 
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { 
    this.initForm()
  }

  ngOnInit() {
    this.getAllRecipes()
  }

  initForm() {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required]],
      prepTimeMinutes: [0, [Validators.required, Validators.min(1)]],
      cookTimeMinutes: [0, [Validators.required, Validators.min(1)]],
      servings: [0, [Validators.required, Validators.min(1)]],
      difficulty: ['', [Validators.required]],
      cuisine: ['', [Validators.required]],
      caloriesPerServing: [0, [Validators.required, Validators.min(1)]],
      image: ['', [Validators.required]],
    })

    this.recipeForm.get('image')?.valueChanges.subscribe(val => {
      this.previewImage = val
    })
  }

  getAllRecipes() {
    this.api.getAllRecipeAPI().subscribe((res: any) => {
      if (this.id) {
        const recipe = res.find((item: any) => item._id == this.id)
        if (recipe) {
          this.recipeForm.patchValue(recipe)
          this.previewImage = recipe.image
          this.ingredientArray = [...(recipe.ingredients || [])]
          this.instructionArray = [...(recipe.instructions || [])]
          this.mealArray = [...(recipe.mealType || [])]
        }
      }

      res.forEach((item: any) => {
        !this.cusineArray.includes(item.cuisine) && this.cusineArray.push(item.cuisine)
      })

      const dummyMeal = res.map((item: any) => item.mealType)
      const flatDummyMealArray = dummyMeal.flat(Infinity)
      flatDummyMealArray.forEach((item: any) => {
        !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
      })
    })
  }

  addIngredients(input: any) {
    if (input.value) {
      this.ingredientArray.push(input.value)
      input.value = ""
    }
  }

  removeIngredient(value: string) {
    this.ingredientArray = this.ingredientArray.filter((item: string) => item != value)
  }

  addInstruction(input: any) {
    if (input.value) {
      this.instructionArray.push(input.value)
      input.value = ""
    }
  }

  removeInstruction(value: string) {
    this.instructionArray = this.instructionArray.filter((item: string) => item != value)
  }

  mealTypeSelect(event: any) {
    if (event.target.checked) {
      !this.mealArray.includes(event.target.name) &&
        this.mealArray.push(event.target.name)
    } else {
      this.mealArray = this.mealArray.filter((item: string) => item != event.target.name)
    }
  }

  removeMealType(meal: string) {
    this.mealArray = this.mealArray.filter((item: string) => item != meal)
  }

  getRecipeData(): RecipeModel {
    return {
      ...this.recipeForm.value,
      ingredients: this.ingredientArray,
      instructions: this.instructionArray,
      mealType: this.mealArray
    }
  }

  submitRecipe() {
    if (this.recipeForm.valid && this.ingredientArray.length > 0 && this.instructionArray.length > 0 && this.mealArray.length > 0) {
      this.isLoading = true;
      const recipeData = this.getRecipeData()

      if (this.id) {
        this.api.editrecipeAPI(this.id, recipeData).subscribe({
          next: () => {
            this.isLoading = false;
            this.snackBar.open("Recipe updated successfully", "Close", { duration: 3000 });
            this.router.navigateByUrl("/admin/recipe-list")
          },
          error: (err) => {
            this.isLoading = false;
            this.snackBar.open(err.error || "Update failed", "Close", { duration: 3000 });
          }
        })
      } else {
        this.api.addrecipeAPI(recipeData).subscribe({
          next: () => {
            this.isLoading = false;
            this.snackBar.open("Recipe published successfully", "Close", { duration: 3000 });
            this.router.navigateByUrl("/admin/recipe-list")
          },
          error: (err) => {
            this.isLoading = false;
            this.snackBar.open(err.error || "Publication failed", "Close", { duration: 3000 });
          }
        })
      }
    } else {
      this.snackBar.open("Please complete all sections of the form", "Close", { duration: 3000 });
    }
  }
}