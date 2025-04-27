import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

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

  public constructor(private formBuilder: FormBuilder, private router: Router,private loginService: LoginService) {
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
    console.log(`${logPath}/ @registerForm form.value`, this.registerForm.value);

    this.loginService.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        console.log('HTTP Response:', response);
        this.goBack();
      },
      error: (error: any) => console.log('HTTP Error:', error),
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
      'role':[undefined, [Validators.required]],
      'country':['greece', [Validators.required]],
      'region':[undefined, [Validators.required]],
    });
  }


checkPasswordsMatch() {
  this.passwordsMatch = this.registerForm.get('password')!.value === this.registerForm.get('password2')!.value;
}
}
