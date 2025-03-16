import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ObjectHelper } from 'src/app/helpers/object-helper.class';
import { UserService } from '../../user/user.service';
import { ImageCropperDgComponent } from '../../shared/image-cropper/image-cropper.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaGalleryDialogComponent } from '../../shared/media-gallery-dialog/media-gallery-dialog.component';

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
  public galleryReady:boolean = false;
  public imageUrl = '../../assets/images/user.png';
  public imageBase64: string = '';
  public mediaFiles: string[] = [];
  public safeUrl: any;
  @ViewChild('singleFileInput') singleFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('multipleFileInput') multipleFileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialog: MatDialog) {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  public async ngOnInit() {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    await this.getUserId();

    await this.getUserProfile(this.userId);

    await this.getUserPhoto();

    await this.getGuideMedia();

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

  public async getUserPhoto(): Promise<void> {
    const lifecycleName: string = `getUserPhoto`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

      return new Promise<void>((resolve) => {
        this.subscriptions.push(
          this.userService.getUserProfilePhoto(this.userId).subscribe({
            next: (response) => {
              console.log(`${logPath}/@User response`, response);
              this.imageBase64 = response.photoData;
              resolve();
            },
            error: (err) => {
              console.error(`${logPath}/@User error`, err);
              resolve();
            }
          })
        );
      });
  }

  public async getGuideMedia(): Promise<void> {
    const lifecycleName: string = `getGuideMedia`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

      return new Promise<void>((resolve) => {
        this.subscriptions.push(
          this.userService.getGuideMedia(this.userId).subscribe({
            next: (response) => {
              console.log(`${logPath}/@User response`, response);
              this.mediaFiles = response.data;
              this.galleryReady = true;
              resolve();
            },
            error: (err) => {
              console.error(`${logPath}/@User error`, err);
              this.galleryReady = false;
              resolve();
            }
          })
        );
      });
  }

  public formSetup(): void {
    const functionName: string = `formSetup`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    console.log(`${logPath}/ @formSetup`);

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
                this.imageBase64 = result;
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

  public convertImageToBase64(): void  {
    const lifecycleName: string = `convertImageToBase64`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
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
        // console.log(`${logPath}/@User imageBase64`, this.imageBase64);
      }
    };
  }

  public triggerFileInput(_case: string): void {
    const lifecycleName: string = `triggerFileInput`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    if(_case === 'single') {
      this.singleFileInput.nativeElement.click();
    } else {
      this.multipleFileInput.nativeElement.click();
    }
  }

  public onFileChange(event: any): void {
    const lifecycleName: string = `onFileChange`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        let newImage = e.target.result;
        console.log(`${logPath}/@User response`, newImage);
        this.toggleAvatarSize('new', newImage);
      };

      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  }

  public base64ToBlobURL(base64: string, mimeType: string): string {
    const lifecycleName: string = `base64ToBlobURL`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    const blob = this.base64ToBlob(base64, mimeType);
    return URL.createObjectURL(blob);
  }

  public base64ToBlob(base64: string, mimeType: string): Blob {
    const lifecycleName: string = `base64ToBlob`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    try {
      const cleanedBase64 = base64.replace(/^data:image\/(png|jpeg|jpg|gif);base64,/, '');

      const paddedBase64 = cleanedBase64.padEnd(cleanedBase64.length + (4 - (cleanedBase64.length % 4)) % 4, '=');

      const byteCharacters = atob(paddedBase64);

      const byteArrays: number[] = [];
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
      }
      const byteArray = new Uint8Array(byteArrays);

      return new Blob([byteArray], { type: mimeType });
    } catch (error) {
      console.error('Error decoding Base64:', error);
      throw new Error('Invalid Base64 encoding');
    }
  }

  public onMultipleFilesChange(event: Event): void {
    const lifecycleName: string = `onMultipleFilesChange`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    this.galleryReady = false;
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
        const files = Array.from(input.files);
        const fileReaders: Promise<string>[] = [];

        files.forEach((file) => {
            if (file.type.startsWith('image/')) {
                fileReaders.push(
                    new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = (e: any) => resolve(e.target.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    })
                );
            } else {
                alert('Please select valid image files.');
            }
        });

        Promise.all(fileReaders).then((base64Images) => {
            this.mediaFiles.push(...base64Images);

            this.subscriptions.push(
                this.userService.postGuideMedia(this.userId, this.mediaFiles).subscribe({
                    next: (response) => {
                        this.galleryReady = true;
                        console.log(`${logPath}/@User response`, response);
                    },
                    error: (err) => {
                        console.log(`${logPath}/@User error`, err);
                    }
                })
            );
        }).catch(error => console.error(`${logPath}/@FileRead error`, error));
    }
}

public openGallery(): void {
  const lifecycleName: string = `openGallery`;
  const logPath: string = `/${this.componentName}/${lifecycleName}()`;

  this.dialog.open(MediaGalleryDialogComponent, {
    width: '80%',
    maxHeight: '90%',
    data: { images: this.mediaFiles }
  });
}
}
