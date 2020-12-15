import { Component, OnInit } from '@angular/core';
import { Database } from '../database.service';

@Component({
  selector: 'app-allrecords',
  templateUrl: './allrecords.component.html',
  styleUrls: ['./allrecords.component.css']
})
export class AllrecordsComponent implements OnInit {

  allDetails: any

  constructor(private db: Database) { }

  async ngOnInit(): Promise<void> {
    this.allDetails = await this.db.getAllDetails()
  }

  async deleteRecord(objectID){

    console.info(objectID)
    this.db.deleteRecord(objectID)
    this.allDetails = await this.db.getAllDetails()

  }

}
