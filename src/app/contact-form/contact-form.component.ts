import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  log(ngModelObj) {
    console.log(ngModelObj);
  }

  onSubmit(ngFormObj) {
    console.log(ngFormObj);
  }
}
