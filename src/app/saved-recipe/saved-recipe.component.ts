import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-saved-recipe',
  standalone: true,
  imports: [
    RouterLink, 
    MatSnackBarModule, 
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatTooltipModule
  ],
  templateUrl: './saved-recipe.component.html',
  styleUrl: './saved-recipe.component.css'
})
export class SavedRecipeComponent implements OnInit {

  allrecipes: any = []

  constructor(private api: ApiService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllSavedRecipes()
  }

  getAllSavedRecipes() {
    this.api.getUserSavedRecipeApi().subscribe((res: any) => {
      this.allrecipes = res
    })
  }

  removeSavedRecipe(id: string) {
    this.api.deleteSavedRecipeApi(id).subscribe((res: any) => {
      this.snackBar.open("Recipe removed successfully", "Close", { duration: 3000 });
      this.getAllSavedRecipes()
    })
  }

}