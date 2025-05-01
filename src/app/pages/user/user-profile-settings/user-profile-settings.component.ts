import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { ObjectHelper } from 'src/app/helpers/object-helper.class';

@Component({
  selector: 'app-user-profile-settings',
  templateUrl: './user-profile-settings.component.html',
  styleUrls: ['./user-profile-settings.component.css']
})

export class UserProfileSettingsComponent implements OnInit, OnDestroy {

  private componentName: string = `UserProfileComponent`;
  public profileForm: FormGroup = new FormGroup({});
  private subscriptions: Subscription[] = [];

  public formReady:boolean = false;
  public isPasswordVisible:boolean = false;

  private userId:number = 1;
  public selectedUser: any;

  public regions: any[] = [
    { viewValue: 'Central Greece', value: 'Central_Greece' },
    { viewValue: 'Macedonia', value: 'Μacedonia' },
    { viewValue: 'Crete', value: 'Crete' },
    { viewValue: 'Thrace', value: 'Τhrace' }
  ];

  constructor(private fb: FormBuilder, private userService: UserService) {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  public async ngOnInit() {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Login`);

    await this.getUserId();
    await this.getUserProfile(this.userId);

    this.formSetup();
  }

  public formSetup(): void {
    const functionName: string = `formSetup`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    // console.log(`${logPath}/ @Login`);

    this.profileForm = this.fb.group({
      username: [{ value: undefined, disabled: true }],
      email: [{ value: undefined, disabled: true }],
      name: [undefined],
      surname: [undefined],
      password: [undefined],
      region: [undefined],
      role: [{ value:undefined, disabled: true}],
      country: [undefined]
      // aboutMe: ['Oh so, your weak rhyme You doubt I\'ll bother, reading into it']
    });

    this.initializeForm(this.selectedUser);

    this.formReady = true;
  }

  private async initializeForm(_user: any): Promise<void> {
    const functionName: string = `initializeForm`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    console.log(`${logPath}/ @ _user`, _user);

    this.profileForm.patchValue(
      ObjectHelper.only(_user, [
        'username',
        'email',
        'name',
        'surname',
        'region',
        'role',
        'country'
      ])
    );

    // this.transferForm.get('to')?.patchValue(_transfer.to);

    this.formReady = true;
  }

  public togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  public async getUserProfile(_id: number): Promise<void> {
    const lifecycleName: string = `getUserProfile`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    return new Promise<void>((resolve, reject) => {
      this.subscriptions.push(
        this.userService.getUserProfileById(_id).subscribe({
          next: (response) => {
            this.selectedUser = response.data;
            console.log(`${logPath}/@User response`, response);
            resolve();
          },
          error: (err) => {
            // this.error = err; // Handle errors
            console.log(`${logPath}/@User error`, err);
            reject(err);
          }
        })
      );
    });
  }

  public async getUserId(): Promise<void> {
    const lifecycleName: string = `getUserId`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    return new Promise<void>((resolve, reject) => {
      this.subscriptions.push(
        this.userService.getUserId().subscribe({
          next: (response) => {
            this.userId = response.userId;
            console.log(`${logPath}/@User response $7`, response);
            resolve();
          },
          error: (err) => {
            // this.error = err; // Handle errors
            console.log(`${logPath}/@User error $7`, err);
            reject(err);
          }
        })
      );
    });
  }

  public onSubmit(): void {
    const functionName: string = `onSubmit`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    console.log(`${logPath}/ @registerForm form.value`, this.profileForm.value);

    const { username, email, role, ...filteredProfileData } = this.profileForm.value;

    if (!this.profileForm.value.password) {
      delete filteredProfileData.password;
    }

    this.subscriptions.push(
      (this.userService.patchUserById(1,filteredProfileData).subscribe({
        next: (response: any) => console.log('HTTP Response:', response),
        error: (error: any) => console.log('HTTP Error:', error),
        complete: () => console.log('HTTP Complete')
      }))
    );
  }

  public ngOnDestroy(): void {
    const lifecycleName: string = `ngOnDestroy`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Clients`);

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }
}
