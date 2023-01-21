import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();

  userForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private toastr: ToastrService,
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSvc.logout();
    this.userForm = this.initForm();
  }

  onSubmit() {
    const { email, password } = this.userForm.value;
    if (email == '' || password == '') {
      this.toastr.error(
        'Porfavor complete todos los datos',
        'Formulario Invalido'
      );
      return;
    }

    this.authSvc.login(this.userForm.value).subscribe(
      (res) => {
        this.router.navigate(['/principal']);
      },
      (err) => {
        this.toastr.error(
          'Porfavor complete sus datos correctamente',
          'Usuario No Registrado'
        );
      }
    );
  }

  initForm() {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
