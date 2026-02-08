import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-download-list',
  standalone: false,
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.css'
})
export class DownloadListComponent implements OnInit {

  allDownloads: any = []
  searchKey: string = ""
  p: number = 1

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAllDownloadList()
  }

  getAllDownloadList() {
    this.api.allDownloadApi().subscribe((res: any) => {
      this.allDownloads = res
    })
  }
}
