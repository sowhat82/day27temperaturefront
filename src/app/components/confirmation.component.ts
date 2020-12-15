import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Database } from '../database.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  confirmationDetails: any

  constructor(private http: HttpClient, private db: Database) { }

  async ngOnInit(): Promise<void> {

   this.confirmationDetails = await this.db.getConfirmationDetails()

  }


}
