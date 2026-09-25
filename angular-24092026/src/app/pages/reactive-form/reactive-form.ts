import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-reactive-form',
  styleUrl: './reactive-form.css',
  templateUrl: './reactive-form.html',
})
export class ReactiveForm {

  studentForm = new FormGroup({
    rollno: new FormControl('', Validators.required),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    fatherName: new FormControl(''),
    dob: new FormControl(''),
    countryCode: new FormControl('+91'),
    mobileNo: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    gender: new FormControl(''),
    department: new FormControl([] as string[]),
    course: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl('')
  })

  submitForm() {
    console.log('Student Data:', this.studentForm.value);
  }

}
