import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UsernameValditors } from './username.validators';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UsernameValditors.CannotContainSpace
    ], UsernameValditors.shouldBeUnique),
    password: new FormControl()
  })

  get username() {
    return this.form.get('username');
  }

  login() {
    this.form.setErrors({ invalidLogin: true })
  }

}
