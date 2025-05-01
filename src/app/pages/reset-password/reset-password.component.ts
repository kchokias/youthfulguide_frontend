import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private componentName: string = `ResetPasswordComponent`;
  public message: string = ``;
  public token: string = ``;
  public newPasswordForm: FormGroup = new FormGroup({});
  public hide = true;
  public confirmHide = true;
  public passwordsMatch: boolean = false;
  private subscriptions: Subscription[] = [];

  public constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute) {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  public ngOnInit(): void {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Login`);

    this.activatedRoute.paramMap.subscribe(params => {
      this.token = params.get('token')!;
    });


    this.newPasswordFormSetup();
  }

  public ngOnDestroy(): void {
    const lifecycleName: string = `ngOnDestroy`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Login`);

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

  public newPasswordFormSetup(): void {
    const functionName: string = `newPasswordFormSetup`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    // console.log(`${logPath}/ @Login`);

    this.newPasswordForm = this.formBuilder.group({
      'password':  [undefined, [Validators.required]],
      'password2': [undefined, [Validators.required]]
    });
  }

  public onNewPasswordSubmit(): void {
    const functionName: string = `onNewPasswordSubmit`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    console.log(`${logPath}/ @Login form.value`, this.newPasswordForm.value);

    this.subscriptions.push
      (this.loginService.resetPassword(this.token, this.newPasswordForm!.value.password)
      .subscribe({
        next: (response) => {
          console.log(`${logPath}/ @loginForm response`, response);
          // this.message = response.message;
        },
        error: (error) => {
          let loginError = 'This email does not exist in our system';
        }
      })
    );
  }

  public goBack(): void {
    this.router.navigate(['/login']);
  }

  public checkPasswordsMatch() {
    this.passwordsMatch = this.newPasswordForm.get('password')!.value === this.newPasswordForm.get('password2')!.value;
  }
}
