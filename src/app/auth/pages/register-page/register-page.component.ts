import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as custonValidators  from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { emailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ]],
    // email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [new emailValidator()]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [this.emailValidator]],
    username: ['', [ Validators.required, this.validatorsService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    //Coloca el formulario como argumento implicito: osea tiene acceso a todos sus campos
    Validators: [
      this.validatorsService.isFieldOneEqualFielTwo('password', 'password2'),
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: emailValidator
    ) {}


  // isValidField( field: string ): boolean | null {
  //   return this.myForm.controls[field].errors
  //     && this.myForm.controls[field].touched;
  // }

  isValidField( field: string ){
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    //     this.myForm.markAllAsTouched();
  }
    // if( this.myForm.invalid ){
    //   //Marca todo como si todos los campos fueron tocados
    //     this.myForm.markAllAsTouched();
    //     return;
    //   }


}
