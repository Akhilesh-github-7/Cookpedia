import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatSnackBarModule, 
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDividerModule,
    MatTooltipModule,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileImage:string="https://static.thenounproject.com/png/2532839-200.png"
  userName: string = "User"
  allUserDownloadList:any=[]

  constructor(private api:ApiService, private snackBar: MatSnackBar){}

  ngOnInit(){
    this.getUserDownloads()
    const user = JSON.parse(sessionStorage.getItem("user")|| "")
    if(user.profilePic){
      this.profileImage = user.profilePic
    }
    if(user.username){
      this.userName = user.username
    }
  }

  getUserDownloads(){
    this.api.getUserDownloadRecipeApi().subscribe((res:any)=>{
      this.allUserDownloadList = res
      console.log(this.allUserDownloadList);
      
    })
  }

  getfile(event:any){
    let uploadFile = event.target.files[0]
    // convert the file to style style url
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profileImage = event.target.result as string
      
    }
  }

  updateProfile(){
    this.api.editUserApi({profilePic:this.profileImage}).subscribe((res:any)=>{
      sessionStorage.setItem("user",JSON.stringify(res))
      this.profileImage=res.profilePic
      this.snackBar.open("Profile updated successfully", "Close", { duration: 3000 });
    })
  }

}
