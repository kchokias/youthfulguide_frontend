import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private componentName: string = `ForgotPasswordComponent`;
  public forgotForm: FormGroup = new FormGroup({});
  public newPasswordForm: FormGroup = new FormGroup({});
  public bringPassword: boolean = false;
  public passwordChecks: boolean = false;

  public constructor(private formBuilder: FormBuilder, private router: Router) {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  public ngOnInit(): void {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Login`);

    this.emailFormSetup();
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

    this.bringPassword = true;
  }

  public goBack(): void {
    this.router.navigate(['/login']);
  }
}
