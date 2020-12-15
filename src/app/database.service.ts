import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class Database {

    NRIC = ""

    constructor(private http:HttpClient){}

    async getConfirmationDetails(){
        const confirmationDetails = await this.http.get<any>('/confirmationDetails/'+this.NRIC).toPromise()
        return confirmationDetails
    }

    async getAllDetails(){
        const allDetails = await this.http.get<any>('/allDetails').toPromise()
        return allDetails
    }

    async deleteRecord(objectID){
        const params = new HttpParams()
        .set('objectID', objectID)
        console.info(params)
        const httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    
        await this.http.post('/deleteRecord', params, {headers: httpHeaders}).toPromise()

    }
}