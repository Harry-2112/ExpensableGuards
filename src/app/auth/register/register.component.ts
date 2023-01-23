import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  MinValidator,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from 'src/app/services/register.service';

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
    private authSvc: AuthService,
    private registerSvc: RegisterService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.initForm();
    this.authSvc.logout();
  }

  onSubmit() {
    const { email, firstName, lastName, password, phone, ConfirmPass } =
      this.registerForm.value;

    if (
      email == '' ||
      firstName == '' ||
      lastName == '' ||
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
    if (phone.length !== 9) {
      this.toastr.error(
        'El numero de telefono tiene que tener 9 caracteres',
        'Error'
      );
      return;
    }
    const register = {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
    };
    this.registerSvc.register(register).subscribe(
      (data) => {
        this.toastr.success(
          'Su cuenta fue creada satisfactoriamente',
          'Felicitaiones!'
        );
        console.log('Form =>', data);
        this.router.navigate(['login']);
      },
      (error) => {
        console.log(error);
        this.registerForm.reset();
      }
    );
  }

  initForm() {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      ConfirmPass: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
    });
  }
}
