import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '@/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm: FormGroup | null;
  loading = false;
  submitted = false;


  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.forgetForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  get f() {
    return this.forgetForm?.controls;
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;

    if (this.forgetForm?.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.resetPasswordRequest(this.f?.email.value).subscribe(r =>{
      console.log('email',r);
    }, error => {
      console.log(error);
      this.loading = false;
    })






  }



}
