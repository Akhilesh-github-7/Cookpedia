import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  Highcharts:typeof Highcharts = Highcharts
  chartOptions = {}
  isSidebarOpen:Boolean=true
  columnWidth:String = "col-lg-10"
  userCount:number=0
  recipeCount:number=0
  downloadCount:number=0
  requestCount:number=0
  selected=new Date()

  menuBtnClick(){
    this.isSidebarOpen = !this.isSidebarOpen
    this.columnWidth ="col"
  }

  constructor(private router:Router,private api:ApiService){
   if(localStorage.getItem('chart')){

    let chartData = JSON.parse(localStorage.getItem('chart') || "")
    this.chartOptions = {
      chart:{
        type:'bar'
      },
      title:{
        text:'Analysis of download recipes based on cuisine',
        align:'left'
      },
      xAxis:{
        type:"category"
      },
      yAxis:{
        title:{
          text:'Total download recipe count'
        }
      },
      legend:{
        enabled:false
      },
      credits:{
        enabled:false
      },
      series:[{
        name: "cuisine",
        colorByPoint:true,
        type:'bar',
        data:chartData
      }]
    }
   }
  }

  ngOnInit(){
    this.getUserCount()
    this.getRecipeCount()
    this.getDownloadCount()
    this.getRequestCount()
  }
  
  getUserCount(){
    this.api.allUsersApi().subscribe((res:any)=>{
      this.userCount = res.length
    })
  }

  getRecipeCount(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.recipeCount = res.length
    })
  }

  getDownloadCount(){
    this.api.allDownloadApi().subscribe((res:any)=>{
      console.log(res);
      
      // code extracting cuisine and its total download count as object and added to an array
      //  input: [....{recipeCuisine,count}]
      //  output:[....{name:cuisine,y:totalCount}]

      // algorithm
      // 1.create an empty array for ouput, object for storing each array item
      // 2. get each array item of res and store its recipeCuisine & count to a variable
      // 3. check recipeCuisine is variable in output object,if present then set the value of recipeCusine key as total existing recipeCuisine value with new count.,not present then insert recipeCuisine as key and value as its count.
      // 4. Push each key from output object into output array

     
      
      


      this.downloadCount = res.map((item:any)=>item.count).reduce((a:any , b:any)=>a+b)
    })
  }

  getRequestCount(){
    this.api.allTestimonyApi().subscribe((res:any)=>{
      this.requestCount = res.filter((item:any)=>item.status == 'Pending').length
    })
  }

  logoutAdmin(){
    sessionStorage.clear()
    this.router.navigateByUrl('/')
  }


}
