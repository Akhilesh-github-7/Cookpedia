import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    RouterLink, 
    MatSnackBarModule, 
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {
  recipeId: string = ""
  recipe: any = {}
  allRelatedRecipes: any = []

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private api: ApiService, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      this.activatedRoute.params.subscribe((res: any) => {
        this.recipeId = res.id
        this.getRecipeDetails(this.recipeId)
      })
    } else {
      this.snackBar.open("Please login to get full access", "Close", { duration: 3000 });
      this.router.navigateByUrl('/login');
    }
  }

  getRecipeDetails(recipeId: string) {
    this.api.viewRecipeApi(recipeId).subscribe((res: any) => {
      this.recipe = res
      this.getAllRelatedRecipeApi(res.cuisine)
    })
  }

  getAllRelatedRecipeApi(cuisine: string) {
    this.api.relatedRecipeApi(cuisine).subscribe((res: any) => {
      if (res.length > 1) {
        this.allRelatedRecipes = res.filter((item: any) => item.name != this.recipe.name)
      } else {
        this.allRelatedRecipes = []
      }
    })
  }

  downloadRecipe() {
    this.api.downloadRecipeAPI(this.recipeId, this.recipe).subscribe((res: any) => {
      this.api.getChartdata()
      this.generatePdf()
    })
  }

  generatePdf() {
    const pdf = new jsPDF()
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name, 10, 10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")
    pdf.text(`Cuisine: ${this.recipe.cuisine}`, 10, 20)
    pdf.text(`Serving: ${this.recipe.servings}`, 10, 25)
    pdf.text(`Mode of Cooking: ${this.recipe.difficulty}`, 10, 30)
    pdf.text(`Total Preparation Time: ${this.recipe.prepTimeMinutes} Minutes`, 10, 35)
    pdf.text(`Total Cooking Time: ${this.recipe.cookTimeMinutes} Minutes`, 10, 40)
    pdf.text(`Total Calorie per Serving: ${this.recipe.caloriesPerServing}`, 10, 45)
    
    let head = [['Ingredients Needed', "Cooking Instruction"]]
    let body = []
    body.push([this.recipe.ingredients.join(', '), this.recipe.instructions.join('\n')])
    autoTable(pdf, { head, body, startY: 50 })
    pdf.save(`${this.recipe.name.replace(/\s+/g, '-').toLowerCase()}-recipe.pdf`)
  }

  saveRecipe() {
    this.api.saveRecipeApi(this.recipeId, this.recipe).subscribe({
      next: (res: any) => {
        this.snackBar.open("Recipe successfully added to your collection", "Close", { duration: 3000 });
      },
      error: (reason: any) => {
        this.snackBar.open(reason.error || "Failed to save recipe", "Close", { duration: 3000 });
      }
    })
  }
}
