import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CategoriasComponent } from './expensable/categorias/categorias.component';
import { PresupuestoComponent } from './expensable/presupuesto/presupuesto.component';
import { PrincipalComponent } from './expensable/principal/principal.component';
import { TransaccionesComponent } from './expensable/transacciones/transacciones.component';
import { PermisionsGuard } from './guards/permisions.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'principal',
    component: PrincipalComponent,
    canActivate: [PermisionsGuard],
    children: [
      { path: 'categorias', component: CategoriasComponent },
      { path: 'transactions', component: TransaccionesComponent },
      { path: 'budgets', component: PresupuestoComponent },
      { path: '**', component: CategoriasComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
