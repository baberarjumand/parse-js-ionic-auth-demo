import { UserAuthService } from './../services/user-auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  showLoadingSpinner = false;
  showPasswordField = false;
  showUserNotFoundMsg = false;

  loginFormGroup: FormGroup;

  usernameFieldSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService
  ) {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.usernameFieldSub = this.loginFormGroup
      .get('username')
      .valueChanges.pipe(
        tap((val) => {
          if (val && val.length >= 3) {
            this.showLoadingSpinner = true;
          }
          this.showUserNotFoundMsg = false;
          this.showPasswordField = false;
        }),
        debounceTime(2000),
        distinctUntilChanged()
      )
      .subscribe(async (val) => {
        if (val.length >= 3) {
          try {
            const userSearchResultsArr = await this.userAuthService.checkIfUserExists(
              val
            );
            console.log('userObj:', userSearchResultsArr);
            if (userSearchResultsArr.length === 1) {
              this.showPasswordField = true;
            } else {
              this.showPasswordField = false;
              this.showUserNotFoundMsg = true;
            }
          } catch (error) {
          } finally {
            this.showLoadingSpinner = false;
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.usernameFieldSub) {
      this.usernameFieldSub.unsubscribe();
    }
  }

  async onLoginFormSubmit(): Promise<void> {
    try {
      await this.userAuthService.login(
        this.loginFormGroup.value.username,
        this.loginFormGroup.value.password
      );
      this.loginFormGroup.reset();
    } catch (error) {}
  }
}
