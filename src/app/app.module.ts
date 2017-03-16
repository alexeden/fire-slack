import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';


const routes: Routes =
  [ { path: ''
    , component: AppComponent
    }
  ];


@NgModule({
  imports:
    [ RouterModule.forRoot(routes)
    , BrowserModule
    , FormsModule
    , ReactiveFormsModule
    , HttpModule
    ],
  entryComponents: [
    AppComponent
  ],
  declarations:
    [ AppComponent
    ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
