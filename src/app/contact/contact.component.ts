import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatSnackBarModule, 
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  testimonyForm:FormGroup
  constructor(private fb:FormBuilder,private api:ApiService, private snackBar: MatSnackBar){
    this.testimonyForm = this.fb.group({
      name:["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      email:["",[Validators.required,Validators.email]],
      message:["",[Validators.required,Validators.pattern("[a-zA-Z0-9 ]*")]]
    })
  }

  addTestimony(){
    if(this.testimonyForm.valid){
      const name = this.testimonyForm.value.name
      const email = this.testimonyForm.value.email
      const message = this.testimonyForm.value.message
      // alert(`${name},${email},${message}`)
      this.api.addTestimonyAPI({name,email,message}).subscribe((res:any)=>{
        this.snackBar.open("Thank you for your valuable testimony!!!", "Close", { duration: 3000 });
        this.testimonyForm.reset()
      })

    }else{
      this.snackBar.open("Invalid Form", "Close", { duration: 3000 });
    }
  }

}
