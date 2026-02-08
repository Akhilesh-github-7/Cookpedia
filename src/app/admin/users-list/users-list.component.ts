import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  allUsers: any = []
  searchKey: string = ""
  p: number = 1

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.api.allUsersApi().subscribe((res: any) => {
      this.allUsers = res
    })
  }
}
