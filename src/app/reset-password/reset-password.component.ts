import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "@/services/authentication.service";
import {AlertService} from "@/services/alert.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup | null = null;
  loading = false;
  submitted = false;
  token: any= '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private alertService:AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {

    this.resetForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.route.queryParams.subscribe(params =>{
      this.token = params['token'];
    })

  }

  get f() {
    return this.resetForm?.controls;
  }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm?.invalid) {
      return;
    }
    console.log('submit');

    this.loading = true;

    let data: any = {};
    data.token = this.token;

    this.authenticationService.resetPassword(this.resetForm?.value, data).subscribe(r =>{
      this.router.navigate(['/login']);
      let res: any  = {};
      res = r;
      this.alertService.success(res.message);
    });
  }
}
