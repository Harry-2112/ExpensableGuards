import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  titulo = '{Expensable}';
  name!: any;
  email!: any;
  titleApp: string = 'Categories';
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    console.log(this.name);
    this.email = localStorage.getItem('email');
    console.log(this.email);
  }
  cambiarTitulo(titulo: string) {
    this.titleApp = titulo;
  }
  salir() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
