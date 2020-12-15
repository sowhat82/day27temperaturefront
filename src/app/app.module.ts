import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './components/confirmation.component';
import { Database } from './database.service';
import { AllrecordsComponent } from './components/allrecords.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'allRecords', component: AllrecordsComponent },
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmationComponent,
    AllrecordsComponent
  ],
  imports: [
    BrowserModule, BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes), FormsModule, ReactiveFormsModule
  ],
  providers: [Database],
  bootstrap: [AppComponent]
})
export class AppModule { }
