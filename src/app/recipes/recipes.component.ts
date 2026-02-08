import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    SearchPipe,
    FormsModule,
    NgxPaginationModule,
    MatSnackBarModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatListModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSidenavModule
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  p: number = 1;
  searchKey: string = "";
  allRecipes: any = [];
  cusineArray: any = [];
  mealTypeArray: any = [];
  dummyAllRecipes: any = [];
  activeFilter: string = 'All';
  isMobile: boolean = false;

  constructor(
    private api: ApiService, 
    private router: Router, 
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) { 
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit() {
    this.getAllRecipes();
  }

  getAllRecipes() {
    this.api.getAllRecipeAPI().subscribe((res: any) => {
      this.allRecipes = res;
      this.dummyAllRecipes = this.allRecipes;
      this.activeFilter = 'All';
      
      this.allRecipes.forEach((item: any) => {
        !this.cusineArray.includes(item.cuisine) && this.cusineArray.push(item.cuisine);
      });

      const dummyMeal = this.allRecipes.map((item: any) => item.mealType);
      const flatDummyMealArray = dummyMeal.flat(Infinity);
      flatDummyMealArray.forEach((item: any) => {
        !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item);
      });
    });
  }

  filterAllRecipes(key: string, value: string) {
    this.allRecipes = this.dummyAllRecipes.filter((item: any) => item[key].includes(value));
    this.activeFilter = value;
    this.p = 1; 
    if (this.isMobile) {
      this.sidenav.close();
    }
  }
  
  resetFilter() {
    this.getAllRecipes();
    if (this.isMobile) {
      this.sidenav.close();
    }
  }

  viewRecipe(recipeId: string) {
    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl(`/recipe/${recipeId}/view`);
    } else {
      this.snackBar.open("Please login to get full access", "Close", { duration: 3000 });
    }
  }
}
