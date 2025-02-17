import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent {
  profileForm: FormGroup;

  team = [
    { name: 'DJ Khaled', status: 'Offline', image: 'assets/img/faces/ayo-ogunseinde-2.jpg' },
    { name: 'Creative Tim', status: 'Available', image: 'assets/img/faces/joe-gardner-2.jpg' },
    { name: 'Flume', status: 'Busy', image: 'assets/img/faces/clem-onojeghuo-2.jpg' }
  ];

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      company: [{ value: 'Creative Code Inc.', disabled: true }],
      username: ['michael23'],
      email: [''],
      firstName: ['Chet'],
      lastName: ['Faker'],
      address: ['Melbourne, Australia'],
      city: ['Melbourne'],
      country: ['Australia'],
      postalCode: [''],
      about: ['']
    });
  }
}
