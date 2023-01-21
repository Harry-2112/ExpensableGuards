import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PermisionsGuard implements CanActivate {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authSrv: AuthService
  ) {}
  canActivate(): boolean {
    if (this.hasUser()) {
      console.log('true');
      return true;
    }
    //si no esta logeado
    console.log('false');

    this.router.navigate(['/']);
    this.toastr.error(
      'Porfavor complete el formulario de login',
      'No se encuentra Logeado'
    );
    return false;
  }
  hasUser(): boolean {
    return !this.authSrv.Comprobar();
  }
}
