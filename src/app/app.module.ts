import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { AuthModule } from './auth/auth.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_ROUTES } from './app.routes';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AuthService } from './services/auth.service';

import { ToastrModule } from 'ngx-toastr';
import { ExpensableModule } from './expensable/expensable.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoriasService } from './services/categorias.service';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTES,
    ToastrModule.forRoot(),
    ExpensableModule,
    HttpClientModule,
    ScrollingModule,
  ],
  providers: [
    AuthService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CategoriasService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
