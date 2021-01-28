import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | null = null;
  loading = false;
  submitted = false;
  // userType:any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
      phone_number: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm?.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm?.invalid) {
      return;
    }

    const user:User = this.registerForm?.value;
    // if(user.password !== user.password_confirmation){
    //   this.alertService.error("Passwords doesn't match");
    //   return
    // }
    this.loading = true;
    this.userService
      .register(this.registerForm?.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
          console.log(data);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }


}
