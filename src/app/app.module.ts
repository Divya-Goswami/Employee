import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ApiService } from './api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListComponent } from './list/list.component';
import { EmployeeComponent } from './employee/employee.component';

import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EmployeeComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
