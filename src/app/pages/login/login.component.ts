import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/helpers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup = new FormGroup({});
  private componentName: string = `LoginComponent`;
  private subscriptions: Subscription[] = [];
  public formReady: boolean = false;
  public emailErrorFlag: boolean = false;
  public logoBase64: string = '';
  public errorMessage: string = 'rfsdfsdfsd';
  hide = true;

  public constructor(private loginService: LoginService, private authService: AuthService,private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Login`);

    this.formSetup();
  }

  public ngOnDestroy(): void {
    const lifecycleName: string = `ngOnDestroy`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Login`);

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

  public onSubmit(): void {
    const functionName: string = `onSubmit`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    console.log(`${logPath}/ @Login form.value`, this.loginForm.value);

    this.emailErrorFlag = false;

    this.subscriptions.push
      (this.loginService.login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          console.log(`${logPath}/ @loginForm response`, response);
          const token = response.token;
          this.authService.setUserRole(response.user.role);

          setTimeout(() => {
            this.authService.login(token);
          }, 1000);
        },
        error: (error) => {
          console.log(`${logPath}/ @Error`, error);
          if (error.status === 401) {
            this.emailErrorFlag = true;
          }
        }
      })
    );
  }

  public formSetup(): void {
    const functionName: string = `formSetup`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    // console.log(`${logPath}/ @Login`);

    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
    });

    this.formReady = true;
  }

}
