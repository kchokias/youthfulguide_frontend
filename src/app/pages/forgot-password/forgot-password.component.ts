import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';
import { SnackbarService } from '../shared/snackbar/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  private componentName: string = `ForgotPasswordComponent`;
  public message: string = ``;
  public forgotForm: FormGroup = new FormGroup({});
  private subscriptions: Subscription[] = [];
  public emailErrorFlag: boolean = false;
  public errorMessage: string = 'rfsdfsdfsd';

  public constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snackbarService: SnackbarService) {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  public ngOnInit(): void {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Login`);

    this.emailFormSetup();
  }

  public ngOnDestroy(): void {
    const lifecycleName: string = `ngOnDestroy`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Login`);

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

  public emailFormSetup(): void {
    const functionName: string = `emailFormSetup`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    // console.log(`${logPath}/ @Login`);

    this.forgotForm = this.formBuilder.group({
      'email':  [undefined, [Validators.required, Validators.email]]
    });
  }

  public onEmailSubmit(): void {
    const functionName: string = `onSubmit`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    console.log(`${logPath}/ @Login form.value`, this.forgotForm.value);

    this.forgotForm.markAllAsTouched();

    if (this.forgotForm.invalid) {
      console.warn(`${logPath}/ Form is invalid, aborting submission.`);
      return;
    }


    this.subscriptions.push
      (this.loginService.forgotPassword(this.forgotForm.value)
      .subscribe({
        next: (response) => {
          console.log(`${logPath}/ @loginForm response`, response);
          this.snackbarService.open(response.message, 'success');
          this.errorMessage = response.message;
          this.goBack();
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
}
