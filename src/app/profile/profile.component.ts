import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileImage:string="https://static.thenounproject.com/png/2532839-200.png"

  allUserDownloadList:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getUserDownloads()
    const user = JSON.parse(sessionStorage.getItem("user")|| "")
    if(user.profilePic){
      this.profileImage = user.profilePic
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
      this.profileImage=event.target.result
      
    }
  }

  updateProfile(){
    this.api.editUserApi({profilePic:this.profileImage}).subscribe((res:any)=>{
      sessionStorage.setItem("user",JSON.stringify(res))
      this.profileImage=res.profilePic
      alert("profile updated successfully")
    })
  }

}
