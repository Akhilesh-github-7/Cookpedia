import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf'

@Component({
  selector: 'app-view',
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  recipeId:string = ""
  recipe:any={}
  allRelatedRecipes:any =[]

  constructor(private router:ActivatedRoute,private api:ApiService){}

  
  ngOnInit(){
    this.router.params.subscribe((res:any)=>{
      this.recipeId = res.id
      console.log(this.recipeId);
      this.getRecipeDetails(this.recipeId)
      

    })
  }

  getRecipeDetails(recipeId:string){
    this.api.viewRecipeApi(this.recipeId).subscribe((res:any)=>{
      this.recipe = res
      console.log(this.recipe);
      this.getAllRelatedRecipeApi(res.cuisine)
      
    })
  }

  getAllRelatedRecipeApi(cuisine:string){
    this.api.relatedRecipeApi(cuisine).subscribe((res:any)=>{
      if(res.length>1){
        this.allRelatedRecipes = res.filter((item:any)=>item.name!=this.recipe.name)
        console.log(this.allRelatedRecipes);
        
      }else{

        this.allRelatedRecipes=[]
        
      }
      
    })
  }

  downloadRecipe(){
    this.api.downloadRecipeAPI(this.recipeId,this.recipe).subscribe((res:any)=>{
      this.api.getChartdata()
      this.generatePdf()
    })
  }

  // generatepdf
  generatePdf(){
    const pdf = new jsPDF()
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name,10,10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")
    pdf.text(`Cuisine: ${this.recipe.cuisine}`,10,20)
    pdf.text(`Serving: ${this.recipe.servings}`,10,25)
    pdf.text(`Mode of Cooking: ${this.recipe.difficulty}`,10,30)
    pdf.text(`Total Prepration Time: ${this.recipe.prepTimeMinutes}`,10,35)
    pdf.text(`Total Cooking Time: ${this.recipe.cookTimeMinutes}`,10,40)
    pdf.text(`Total Calorie per Serving: ${this.recipe.caloriesPerServing}`,10,45)
    let head = [['Ingrediants Needed',"Cooking Instruction"]]
    let body = []
    body.push([this.recipe.ingredients,this.recipe.instructions])
    autoTable(pdf,{head,body,startY:50})
    pdf.output("dataurlnewwindow")
    pdf.save("download-recipe.pdf")
  }


  // saveRecipe
  saveRecipe(){
    this.api.saveRecipeApi(this.recipeId,this.recipe).subscribe({
      next:(res:any)=>{
        alert("Recipe successfully added to your collection")
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }

}
