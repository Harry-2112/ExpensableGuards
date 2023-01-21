import { Component, OnInit } from '@angular/core';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  Roles: any = ['Admin', 'Author', 'Reader'];

  registerForm!: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.initForm();
    this.authSvc.logout();
  }

  onSubmit() {
    const { email, name, password, phone, ConfirmPass } =
      this.registerForm.value;

    if (
      email == '' ||
      name == '' ||
      password == '' ||
      phone == '' ||
      ConfirmPass == ''
    ) {
      this.toastr.error(
        'Porfavor complete todos los datos',
        'Formulario Invalido'
      );
      return;
    }
    if (password !== ConfirmPass) {
      this.toastr.error('Las Contraseñas No coinsiden', 'Error');
      return;
    }
    this.toastr.success(
      'Su cuenta fue creada satisfactoriamente',
      'Felicitaiones!'
    );
    console.log('Form =>', this.registerForm.value);
    this.router.navigate(['login']);
  }

  initForm() {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      ConfirmPass: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }
}
