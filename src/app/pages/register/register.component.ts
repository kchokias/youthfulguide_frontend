import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { SnackbarService } from '../shared/snackbar/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  hide = true;
  confirmHide = true;
  passwordsMatch: boolean = false;

  public regions: any[] = [
    { viewValue: 'Central Greece', value: 'Central_Greece' },
    { viewValue: 'Macedonia', value: 'Macedonia' },
    { viewValue: 'Crete', value: 'Crete' },
    { viewValue: 'Thrace', value: 'Thrace' }
  ];

  public registerForm: FormGroup = new FormGroup({});
  private componentName: string = `RegisterComponent`;
  public emailErrorFlag: boolean = false;
  public surnameErrorFlag: boolean = false;
  public usernameErrorFlag: boolean = false;
  public nameErrorFlag: boolean = false;
  public passErrorFlag: boolean = false;
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

    this.formSetup();
  }

  public onSubmit(): void {
    const functionName: string = `onSubmit`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    console.log(`${logPath}/ @onSubmit`);

    this.registerForm.markAllAsTouched();

    if (this.registerForm.get('password')!.value !== this.registerForm.get('password2')!.value) {
      this.emailErrorFlag = false;
      this.nameErrorFlag = false;
      this.surnameErrorFlag = false;
      this.usernameErrorFlag = false;
      this.passErrorFlag = true;
      this.errorMessage = 'Passwords do not match!';
    return;
    }

    if (this.registerForm.get('role')!.value === 'pickARole') {
      this.emailErrorFlag = false;
      this.nameErrorFlag = false;
      this.surnameErrorFlag = false;
      this.usernameErrorFlag = false;
      this.passErrorFlag = true;
      this.errorMessage = 'Please select a role!';
      this.snackbarService.open('Please select a role!', 'error');
    return;
    }

    if (this.registerForm.invalid) {
      console.warn(`${logPath}/ Form is invalid, aborting submission.`);
      return;
    }

    this.loginService.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        console.log('HTTP Response:', response);
        this.snackbarService.open('Account is ready!', 'success');
        this.goBack();
      },
      error: (error: any) => {
        this.snackbarService.open(error.error.message, 'error');
        console.log('HTTP Error:', error);
        if (error.error.errorCode === 1) {
          this.emailErrorFlag = false;
          this.nameErrorFlag = true;
          this.surnameErrorFlag = false;
          this.usernameErrorFlag = false;
          this.passErrorFlag = false;
          this.errorMessage = error.error.message;
        }
        else if (error.error.errorCode === 2) {
          this.emailErrorFlag = false;
          this.nameErrorFlag = false;
          this.surnameErrorFlag = true;
          this.usernameErrorFlag = false;
          this.passErrorFlag = false;
          this.errorMessage = error.error.message;
        } else if (error.error.errorCode === 3 || error.error.errorCode === 7) {
          this.emailErrorFlag = false;
          this.nameErrorFlag = false;
          this.surnameErrorFlag = false;
          this.usernameErrorFlag = true;
          this.passErrorFlag = false;
          this.errorMessage = error.error.message;
        } else if (error.error.errorCode === 4) {
          this.emailErrorFlag = true;
          this.nameErrorFlag = false;
          this.surnameErrorFlag = false;
          this.usernameErrorFlag = false;
          this.passErrorFlag = false;
          this.errorMessage = error.error.message;
        } else if (error.error.errorCode === 5 || error.error.errorCode === 6) {
          this.emailErrorFlag = false;
          this.nameErrorFlag = false;
          this.surnameErrorFlag = false;
          this.usernameErrorFlag = false;
          this.passErrorFlag = true;
          this.errorMessage = error.error.message;
        }
      },
      complete: () => console.log('HTTP Complete')
    });
  }

  public goBack(): void {
    this.router.navigate(['/login']);
  }

  public formSetup(): void {
    const functionName: string = `formSetup`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    // console.log(`${logPath}/ @Login`);

    this.registerForm = this.formBuilder.group({
      'name': [undefined, [Validators.required]],
      'surname': [undefined, [Validators.required]],
      'username': [undefined, [Validators.required]],
      'email':  [undefined, [Validators.required, Validators.email]],
      'password':[undefined, [Validators.required]],
      'password2': [undefined, [Validators.required]],
      'role':['pickARole', [Validators.required]],
      'country':['Greece', [Validators.required]],
      'region':['Other', [Validators.required]],
    });
  }


  public checkPasswordsMatch() {
    this.passwordsMatch = this.registerForm.get('password')!.value === this.registerForm.get('password2')!.value;
  }
}
