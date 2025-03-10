import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = "http://localhost:3000"
  constructor(private http:HttpClient) { }
  getAllRecipeAPI(){
    return this.http.get(`${this.server_url}/all-recipes`)
  }

  // add-testimony
  addTestimonyAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-testimony`,reqBody)
  }

  // register
  registerAPI(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)
  }

    // login
    loginAPI(reqBody:any){
      return this.http.post(`${this.server_url}/login`,reqBody)
    }

    // appendToken in req Header
    appendToken(){
      let headers = new HttpHeaders()
      const token = sessionStorage.getItem('token')
      if(token){
        headers = headers.append("Authorization",`Bearer ${token}`)
      }
      return {headers}
    }

    // recipe/:id/view
    viewRecipeApi(recipeId:string){
      return this.http.get(`${this.server_url}/recipe/${recipeId}/view`,this.appendToken())
    }

    // related-recipe
    relatedRecipeApi(cuisine:string){
      return this.http.get(`${this.server_url}/related-recipe?cuisine=${cuisine}`,this.appendToken())
    }

     // recipe/download
     downloadRecipeAPI(recipeId:string,reqBody:any){
      return this.http.post(`${this.server_url}/recipe/${recipeId}/download`,reqBody,this.appendToken())
    }

    // recipe/save
    saveRecipeApi(recipeId:string,reqBody:any){
      return this.http.post(`${this.server_url}/recipe/${recipeId}/save`,reqBody,this.appendToken())
    }

     // get-save-recipes
     getUserSavedRecipeApi(){
      return this.http.get(`${this.server_url}/get-save-recipes`,this.appendToken())
    }

    // delete-save-recipes
    deleteSavedRecipeApi(id:string){
      return this.http.delete(`${this.server_url}/save-recipes/${id}/remove`,this.appendToken())
    }

    // get download recipes
    getUserDownloadRecipeApi(){
      return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
    }

    // user/edit
    editUserApi(reqBody:any){
      return this.http.post(`${this.server_url}/user/edit`,reqBody,this.appendToken())
    }

     // all-users
     allUsersApi(){
      return this.http.get(`${this.server_url}/all-users`,this.appendToken())
    }

     // all-users
     allDownloadApi(){
      return this.http.get(`${this.server_url}/download-list`,this.appendToken())
    }

    // all testimony list
    allTestimonyApi(){
      return this.http.get(`${this.server_url}/all-feedback`,this.appendToken())
    }

    // update status feedback
    updateFeedbackStatusApi(feedbackId:string,status:string){
      return this.http.get(`${this.server_url}/feedback/${feedbackId}/update?status=${status}`,this.appendToken())
    }

    // get approved feedbacks
    getAllApprovedFeedbacksApi(){
      return this.http.get(`${this.server_url}/all-approved-feedback`,this.appendToken())
    }

    // add-recipe
    addrecipeAPI(reqBody:any){
      return this.http.post(`${this.server_url}/add-recipe`,reqBody,this.appendToken())
    }

     // edit-recipe
     editrecipeAPI(id:string,reqBody:RecipeModel){
      return this.http.put(`${this.server_url}/recipe/${id}/edit`,reqBody,this.appendToken())
    }

    // delete-recipe
    deleterecipeAPI(id:string){
      return this.http.delete(`${this.server_url}/recipe/${id}/remove`,this.appendToken())
    }


    // get chart data
    getChartdata(){
      this.allDownloadApi().subscribe((res:any)=>{
        console.log(res);
        let downloadArrayList:any=[]
        let output:any={}
        res.forEach((item:any)=>{
          let cuisine = item.recipeCuisine
          let currentCount = item.count
          if(output.hasOwnProperty(cuisine)){
            output[cuisine] += currentCount
  
          }else{
            output[cuisine] = currentCount
  
          }
        })
        console.log(output);
        for(let cuisine in output){
          downloadArrayList.push({name:cuisine,y:output[cuisine]})
        }
        console.log(downloadArrayList);
        localStorage.setItem("chart",JSON.stringify(downloadArrayList))
        
      })
    }

}
