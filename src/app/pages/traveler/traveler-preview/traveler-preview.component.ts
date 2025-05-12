import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { TravelerService } from '../traveler.service';
import { ActivatedRoute } from '@angular/router';
import { ObjectHelper } from 'src/app/helpers/object-helper.class';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';

@Component({
  selector: 'app-traveler-preview',
  templateUrl: './traveler-preview.component.html',
  styleUrls: ['./traveler-preview.component.css']
})

export class TravelerPreviewComponent  implements OnInit, OnDestroy {
  private componentName: string = `TravelerPreviewComponent`;
  public travelerForm: FormGroup = new FormGroup({});
  private subscriptions: Subscription[] = [];
  private userId:number = -1;
  public selectedUser: any;
  public formReady:boolean = false;
  public isPasswordVisible:boolean = false;
  public mediaReady = false;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private travelerService: TravelerService,
    private fb: FormBuilder,
    private confirmationDialog: ConfirmationDialogService,
    private snackbarService: SnackbarService) {
      const functionName: string = `constructor`;
      const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  public async ngOnInit() {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    await this.getUserId();

    await this.getTravellerProfile(this.userId);

    this.formSetup();
  }

  public async getUserId(): Promise<void> {
    const lifecycleName: string = `getUserId`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    return new Promise<void>((resolve, reject) => {
      this.subscriptions.push(
        this.userService.getUserId().subscribe({
          next: (response) => {
            this.userId = response.userId;
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

  public formSetup(): void {
    const functionName: string = `formSetup`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    // console.log(`${logPath}/ @Login`);

    this.travelerForm = this.fb.group({
      username: [{ value: undefined, disabled: true }],
      email: [{ value: undefined, disabled: true }],
      name: [undefined],
      surname: [undefined],
      password: [undefined],
      region: [undefined],
      role: [{ value:undefined, disabled: true}],
      country: [undefined],
      description: [undefined]
    });

    this.initializeForm(this.selectedUser);

    this.formReady = true;
  }

  public togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  public ngOnDestroy(): void {
    const lifecycleName: string = `ngOnDestroy`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Clients`);

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

  private async initializeForm(_user: any): Promise<void> {
    const functionName: string = `initializeForm`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    console.log(`${logPath}/ @ _user`, _user);

    this.travelerForm.patchValue(
      ObjectHelper.only(_user, [
          'username',
          'email',
          'name',
          'surname',
          'region',
          'role',
          'country',
          'description'
        ])
    );

    this.formReady = true;
  }

  public async getTravellerProfile(_id: number): Promise<void> {
    const lifecycleName: string = `getGuideProfile`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    return new Promise<void>((resolve, reject) => {
      this.subscriptions.push(
        this.travelerService.getTravelerProfileById(_id).subscribe({
          next: (response) => {
            this.selectedUser = response;
            console.log(`${logPath}/@getTravellerProfile response`, response);
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

  public async onSubmit(): Promise<void> {
    const functionName: string = `onSubmit`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    console.log(`${logPath}/ @registerForm form.value`, this.travelerForm.value);

    const confirmed = await this.confirmationDialog.open('Are you sure you want to update this profile?');
    if (!confirmed) return;

    const { username, email, role, ...filteredProfileData } = this.travelerForm.value;

    if (!this.travelerForm.value.password) {
      delete filteredProfileData.password;
    }

    this.subscriptions.push(
      (this.userService.patchUserById(this.userId,filteredProfileData).subscribe({
        next: (response: any) => this.snackbarService.open('Login successfully!', 'success'),
        error: (error: any) => this.snackbarService.open(error.error.message, 'error'),
        complete: () => console.log('HTTP Complete')
      }))
    );
  }

  onMediaReady(): void {
    this.mediaReady = true;
  }
}
