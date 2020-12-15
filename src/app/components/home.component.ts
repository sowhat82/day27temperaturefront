import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Database } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  declarationForm: FormGroup
  file = ""

  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router, private db: Database) { }

  ngOnInit(): void {

    this.declarationForm = this.fb.group({
      NRIC: this.fb.control('', [Validators.required]),
      personalSymptoms: this.fb.control('', [Validators.required]),
      householdSymptoms: this.fb.control('', [Validators.required]),
      temperature: this.fb.control('', [Validators.required]),
      imageFile: this.fb.control('', [Validators.required])
    })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.declarationForm.get('imageFile').setValue(this.file);
    }
  }

  async submit(){
    // add image to digital ocean
    var digitalOceanKey = {}
    if(this.file != ""){

      const formData = new FormData();
      formData.set('image-file', this.file);
      digitalOceanKey = await this.http.post<any>('/uploadImage', formData).toPromise()  
    }

    else{
      digitalOceanKey = {}
    } 

    const params = new HttpParams()
    .set('NRIC', this.declarationForm.get('NRIC').value)
    .set('personalSymptoms', this.declarationForm.get('personalSymptoms').value)
    .set('householdSymptoms', this.declarationForm.get('householdSymptoms').value)
    .set('temperature', this.declarationForm.get('temperature').value)
    .set('digitalOceanKey', digitalOceanKey['key'])

    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')

    await this.http.post('/submitDeclaration', params, {headers: httpHeaders}).toPromise().then(
      function() {
        // success callback
         window.alert('Submitted!')
      },
      function(response) {
        // failure callback,handle error here
        // response.data.message will be "This is an error!"

        console.log(response)
        window.alert(response.error.message)
      }
    )

    this.db.NRIC = this.declarationForm.get('NRIC').value
    this.router.navigate(['/confirmation'])
  }
}
