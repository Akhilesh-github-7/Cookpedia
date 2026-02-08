import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {

  allRecipes: any = []
  searchRecipe: string = ""
  p: number = 1; // For pagination

  constructor(private api: ApiService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllRecipes()
  }

  getAllRecipes() {
    this.api.getAllRecipeAPI().subscribe((res: any) => {
      this.allRecipes = res
    })
  }

  deleteRecipe(id: string) {
    if (confirm("Are you sure you want to delete this recipe?")) {
      this.api.deleterecipeAPI(id).subscribe({
        next: (res: any) => {
          this.snackBar.open("Recipe deleted successfully", "Close", { duration: 3000 });
          this.getAllRecipes()
        },
        error: (err: any) => {
          this.snackBar.open("Failed to delete recipe", "Close", { duration: 3000 });
        }
      })
    }
  }
}
