import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit {

  allfeedbacks: any = []
  p: number = 1

  constructor(private api: ApiService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllFeedbacks()
  }

  getAllFeedbacks() {
    this.api.allTestimonyApi().subscribe((res: any) => {
      this.allfeedbacks = res
    })
  }

  updateFeedbackStatus(id: string, status: string) {
    this.api.updateFeedbackStatusApi(id, status).subscribe((res: any) => {
      this.snackBar.open(`Feedback ${status} successfully`, "Close", { duration: 3000 });
      this.getAllFeedbacks()
    })
  }
}
