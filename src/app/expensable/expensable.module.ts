import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from '../app-routing.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';

import { NavCategoriComponent } from './nav-categori/nav-categori.component';
import { AsideComponent } from './aside/aside.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CalendarioComponent } from './calendario/calendario.component';
import {
  DialogOverviewExample,
  DialogOverviewExampleDialog,
} from './modalPrueba/dialog-overview-example';
import { MatNativeDateModule } from '@angular/material/core';
import { AngularMaterialModule } from '../angular-material.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    PrincipalComponent,
    CategoriasComponent,
    TransaccionesComponent,
    PresupuestoComponent,
    CalendarioComponent,
    NavCategoriComponent,
    AsideComponent,
    DialogOverviewExample,
    DialogOverviewExampleDialog,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    AngularMaterialModule,
    ScrollingModule,
  ],
  exports: [PrincipalComponent, DialogOverviewExample],
})
export class ExpensableModule {}
