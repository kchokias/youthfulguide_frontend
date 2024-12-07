import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});
  private componentName: string = `RegisterComponent`;

  public constructor(private formBuilder: FormBuilder, private router: Router) {
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
    console.log(`${logPath}/ @Login form.value`, this.registerForm.value);
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
      'email':  [undefined, [Validators.required, Validators.email]],
      'password':[undefined, [Validators.required]],
      'password2': [undefined, [Validators.required]],
      'role':[undefined, [Validators.required]]
    });
  }

}
