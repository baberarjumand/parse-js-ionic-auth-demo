import { UserAuthService } from './../services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService,
    private router: Router
  ) {
    this.signUpFormGroup = this.formBuilder.group({
      newUsername: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async onSignUpFormSubmit(): Promise<void> {
    // console.log('signUp Form Submitted:', this.signUpFormGroup.value);

    try {
      await this.userAuthService.newUserSignUp(
        this.signUpFormGroup.value.newUsername,
        this.signUpFormGroup.value.newPassword
      );

      this.router.navigate(['home']);
    } catch (error) {}
  }
}
