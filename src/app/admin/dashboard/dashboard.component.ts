import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {};
  isSidebarOpen: boolean = true;
  isMobile: boolean = false;
  userCount: number = 0;
  recipeCount: number = 0;
  downloadCount: number = 0;
  requestCount: number = 0;
  selected = new Date();

  constructor(
    private router: Router, 
    private api: ApiService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
      if (this.isMobile) {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
    });
  }

  ngOnInit() {
    this.getUserCount();
    this.getRecipeCount();
    this.getDownloadCount();
    this.getRequestCount();
    
    // Initialize chart if data exists
    if (localStorage.getItem('chart')) {
      this.initChart();
    }
  }

  initChart() {
    let chartData = JSON.parse(localStorage.getItem('chart') || "[]");
    this.chartOptions = {
      chart: { type: 'bar' },
      title: { text: 'Download Analysis by Cuisine', align: 'left' },
      xAxis: { type: "category" },
      yAxis: { title: { text: 'Total Downloads' } },
      legend: { enabled: false },
      credits: { enabled: false },
      series: [{
        name: "Cuisine",
        colorByPoint: true,
        type: 'bar',
        data: chartData
      }]
    };
  }
  
  toggleSidenav() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // ... (rest of the methods: getUserCount, etc.) -> I need to keep them.
  
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
      this.downloadCount = res.map((item:any)=>item.count).reduce((a:any , b:any)=>a+b, 0)
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
