import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 allRecipes:any = []
 allFeedbackList:any=[]

 constructor(private api:ApiService){ }

 ngOnInit(){
  this.getAllRecipes()
  this.getAllApprovedFeedbacks()
 }

 getAllRecipes(){
  this.api.getAllRecipeAPI().subscribe((res:any)=>{
    this.allRecipes = res.slice(0,6)
    console.log(this.allRecipes);
    
  })
 }

getAllApprovedFeedbacks(){
  this.api.getAllApprovedFeedbacksApi().subscribe((res:any)=>{
    this.allFeedbackList = res
    console.log(this.allFeedbackList);
    
  })
}

}
