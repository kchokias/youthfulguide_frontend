import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { GuideService } from '../guide.service';

@Component({
  selector: 'app-guide-profile-preview',
  templateUrl: './guide-profile-preview.component.html',
  styleUrls: ['./guide-profile-preview.component.css']
})

export class GuideProfilePreviewComponent implements OnInit, OnDestroy {

  private componentName: string = `GuideProfileComponent`;
  public guideForm: FormGroup = new FormGroup({});
  private subscriptions: Subscription[] = [];
  private userId:number = -1;
  public selectedUser: any;
  public formReady:boolean = false;
  public galleryReady:boolean = false;
  public imageUrl = '../../assets/images/user.png';
  public imageBase64: string = '';
  public profilePic64: string = '';
  public username: string = '';
  public fullName: string = '';
  public region: string = '';
  public description: string = '';
  public rating: number = 0;
  public total: number = 0;
  public mediaFiles: { media_data: string }[] = [];
  public reviews: any[] = [];
  public safeUrl: any;
  @ViewChild('singleFileInput') singleFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('multipleFileInput') multipleFileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private guideService: GuideService) {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  public async ngOnInit() {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    const receivedId = await this.waitForUserIdMessage();

    if (receivedId) {
      this.userId = receivedId;
      console.log(`${logPath} ✅ Received ID from postMessage:`, this.userId);
    } else {
      await this.getUserId();
      console.log(`${logPath} ❗️Fallback getUserId:`, this.userId);
    }

    await this.getGuideProfile(this.userId);

    await this.getGuideReviews(this.userId);

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

  public async getGuideProfile(_id: number): Promise<void> {
    const lifecycleName: string = `getGuideProfile`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    return new Promise<void>((resolve, reject) => {
      this.subscriptions.push(
        this.guideService.getGuideProfileById(_id).subscribe({
          next: (response) => {
            this.selectedUser = response;
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

  public async getGuideReviews(_id: number): Promise<void> {
    const lifecycleName: string = `getGuideReviews`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    return new Promise<void>((resolve, reject) => {
      this.subscriptions.push(
        this.guideService.getGuideReviews            (_id).subscribe({
          next: (response) => {
            this.reviews = response.reviews;
            console.log(`${logPath}/@Reviews response`, response);
            resolve();
          },
          error: (err) => {
            // this.error = err; // Handle errors
            console.log(`${logPath}/@Reviews error`, err);
            reject(err);
          }
        })
      );
    });
  }

  public formSetup(): void {
    const functionName: string = `formSetup`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    console.log(`${logPath}/ @formSetup`);

    this.username = this.selectedUser.username;
    this.fullName = this.selectedUser.name + ' ' + this.selectedUser.surname;
    this.region = this.selectedUser.region + ', ' + this.selectedUser.country;
    this.rating = +this.selectedUser.average_rating;
    this.total = this.selectedUser.total_bookings;
    this.profilePic64 = this.selectedUser.profile_picture;
    this.mediaFiles = this.selectedUser.media;
    this.description = this.selectedUser.description;

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

  private waitForUserIdMessage(): Promise<number | null> {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(null), 1000);

      window.addEventListener('message', function handler(event) {
        if (event.origin !== window.location.origin) return;

        const data = event.data;
        if (data && data.id) {
          window.removeEventListener('message', handler);
          clearTimeout(timeout);
          resolve(data.id);
        }
      });
    });
  }
}
