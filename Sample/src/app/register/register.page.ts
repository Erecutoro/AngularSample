import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, public http: HttpClient) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", [Validators.required, Validators.required]],
      lastName: ["", [Validators.required, Validators.required]]
    });
  }

  register() {
    if (!this.registerForm.valid) {
      console.error("Please fill out the form correctly.");
      return;
    }
    let body = this.registerForm.value;
    this.http.post<any>("http://localhost:3000/employees", body).subscribe();
    this.router.navigate(['/home']);
  }
}
