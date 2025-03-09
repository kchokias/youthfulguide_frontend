import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ObjectHelper } from 'src/app/helpers/object-helper.class';
import { UserService } from '../../user/user.service';
import { ImageCropperDgComponent } from '../../shared/image-cropper/image-cropper.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-guide-profile',
  templateUrl: './guide-profile.component.html',
  styleUrls: ['./guide-profile.component.css']
})

export class GuideProfileComponent implements OnInit, OnDestroy {

  private componentName: string = `GuideProfileComponent`;
  public profileForm: FormGroup = new FormGroup({});
  private subscriptions: Subscription[] = [];
  private userId:number = 1;
  public selectedUser: any;
  public formReady:boolean = false;
  public imageUrl = '../../assets/images/user.png';
  public imageBase64: string = '';
  public safeUrl: any;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer) {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  public async ngOnInit() {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Login`);

    await this.getUserId();
    await this.getUserPhoto();
    this.convertImageToBase64();

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

  public async getUserPhoto(): Promise<void> {
    const lifecycleName: string = `getUserPhoto`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    return new Promise<void>((resolve, reject) => {
      this.subscriptions.push(
        this.userService.getUserProfilePhoto(this.userId).subscribe({
          next: (response) => {
            console.log(`${logPath}/@User response`, response);
            this.imageUrl = response.photoData;
            this.safeUrl = this.sanitizer.bypassSecurityTrustUrl(response.photoData);
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

    this.profileForm = this.fb.group({
      username: [{ value: undefined, disabled: true }],
      email: [{ value: undefined, disabled: true }],
      name: [undefined],
      surname: [undefined],
      password: [undefined],
      region: [undefined],
      role: [{ value:undefined, disabled: true}],
      country: [{ value: undefined, disabled: true }]
      // aboutMe: ['Oh so, your weak rhyme You doubt I\'ll bother, reading into it']
    });

    // this.initializeForm(this.selectedUser);

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

    this.formReady = true;
  }

  public ngOnDestroy(): void {
    const lifecycleName: string = `ngOnDestroy`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Clients`);

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

  public toggleAvatarSize(_action: string, _newImage?: string): void {
    const lifecycleName: string = `toggleAvatarSize`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    let image64;

    if(_action === 'patch') {
      image64 = this.imageBase64;
    } else {
      image64 = _newImage;
    }

    const dialogRef = this.dialog.open(ImageCropperDgComponent, {
      width: '500px',
      data: {
        imageBase64: image64
      }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.subscriptions.push(
            this.userService.postUserProfilePhoto(this.userId, result).subscribe({
              next: (response) => {
                console.log(`${logPath}/@User response`, response);
                this.imageUrl = result;
                this.safeUrl = this.sanitizer.bypassSecurityTrustUrl(result);
              },
              error: (err) => {
                console.log(`${logPath}/@User error`, err);
              }
            })
          );
        }
      })
    );
  }

  convertImageToBase64() {
    const img = new Image();
    img.src = this.imageUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        this.imageBase64 = canvas.toDataURL('image/png');
      }
    };
  }

  triggerFileInput(): void {
    const lifecycleName: string = `triggerFileInput`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    console.log(`${logPath}/@User fileInput $1`, this.fileInput);
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: any): void {
    const lifecycleName: string = `onFileChange`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        let newImage = e.target.result;
        console.log(`${logPath}/@User response $1`, newImage);
        this.toggleAvatarSize('new', newImage);
      };

      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  }
}
