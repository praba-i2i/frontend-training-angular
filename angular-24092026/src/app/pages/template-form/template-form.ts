import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  imports: [FormsModule],
  templateUrl: './template-form.html'
})
export class TemplateForm {

  student = {
    rollno: '',
    firstName: '',
    lastName: '',
    fatherName: '',
    dob: '',
    countryCode: '+91',
    mobileNo: '',
    email: '',
    password: '',
    gender: '',
    department: [] as string[],
    course: '',
    city: '',
    address: ''
  };

  submitForm() {
    console.log('Student Data:', this.student);
  }
}
