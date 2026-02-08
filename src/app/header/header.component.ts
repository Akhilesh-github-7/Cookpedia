import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive, 
    CommonModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedin: boolean = false;
  loginUser: string = "";
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const user = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    if (token && user) {
      this.isLoggedin = true;
      try {
        this.loginUser = JSON.parse(user).username;
      } catch (e) {
        this.loginUser = "User";
      }
    } else {
      this.isLoggedin = false;
      this.loginUser = "";
    }
  }

  logout() {
    sessionStorage.clear();
    this.isLoggedin = false;
    this.loginUser = "";
    this.router.navigateByUrl('/login');
  }
}
