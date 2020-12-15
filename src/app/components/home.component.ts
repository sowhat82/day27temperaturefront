import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  declarationForm: FormGroup
  file = ""

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {

    this.declarationForm = this.fb.group({
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
  }
}
