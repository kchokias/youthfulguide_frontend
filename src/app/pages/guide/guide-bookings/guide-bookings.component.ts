import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { UserService } from "../../user/user.service";
import { MatDialog } from "@angular/material/dialog";
import { GuideService } from "../guide.service";
import { SnackbarService } from "../../shared/snackbar/snackbar.service";

@Component({
  selector: 'app-guide-bookings',
  templateUrl: './guide-bookings.component.html',
  styleUrls: ['./guide-bookings.component.css']
})

export class GuideBookingsComponent implements OnInit, OnDestroy {
  private componentName: string = `GuideBookingsComponent`;
  private subscriptions: Subscription[] = [];
  private userId:number = 1;
  public formReady:boolean = false;
  searchForm: FormGroup;
  private today: Date = new Date();
  private endOfYear: Date = new Date( new Date().getFullYear(), 11, 31);
  public bookingsReady:boolean = false;
  public bookings: any[] = [];

  constructor(
    private fb: FormBuilder,
    private guideService: GuideService,
    private userService: UserService,
    private snackbarService: SnackbarService) {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    this.searchForm = this.fb.group({
      dateRange: this.fb.group({
        start: [this.today],
        end: [this.endOfYear]
      }),
      confirmed: [true],
      pending: [true],
      completed: [true]
    });
  }

  public async ngOnInit() {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    await this.getUserId();

    await this.getGuideBookings();
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

  public async getGuideBookings(): Promise<void> {
    const lifecycleName: string = `getGuideBookings`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    let start = this.formatDateToString(this.searchForm.get('dateRange.start')?.value);
    let end = this.formatDateToString(this.searchForm.get('dateRange.end')?.value);
    let confirmed = this.searchForm.get('confirmed')?.value;
    let pending = this.searchForm.get('pending')?.value;
    let completed = this.searchForm.get('completed')?.value;

    return new Promise<void>((resolve) => {
      this.subscriptions.push(
        this.guideService.geGuidesBookings(start, end, confirmed, pending, completed, this.userId.toString()).subscribe({
          next: (response) => {
            console.log(`${logPath}/@User response`, response);
            this.bookings = response;
            this.bookingsReady = true;
            resolve();
          },
            error: (err) => {
              console.error(`${logPath}/@User error`, err);
              this.bookingsReady = false;
              resolve();
                }
            })
        );
    });
  }

  public async onSearch() {
    const functionName: string = `onSearch`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    this.bookings = [];
    this.bookingsReady = false;
    await this.getGuideBookings();
  }

  private formatDateToString(date: Date): string {
    const functionName: string = `formatDateToString`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    if (!date) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  public ngOnDestroy(): void {
    const lifecycleName: string = `ngOnDestroy`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Clients`);

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

  public onCancelBooking(id: number) : void{
    const functionName: string = `onCancelBooking`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    this.subscriptions.push(
      this.guideService.cancelBooking(id).subscribe({
        next: async (response) => {
          console.log(`${logPath}/@User response`, response);
          await this.getGuideBookings();
          this.bookingsReady = false;
        },
        error: (err) => {
          console.log(`${logPath}/@User error`, err);
        }
      })
    );
  }

  public onAcceptBooking (id: number) : void{
    const functionName: string = `onAcceptBooking`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    this.subscriptions.push(
      this.guideService.acceptBooking(id).subscribe({
        next: async (response) => {
          console.log(`${logPath}/@User response`, response);
          await this.getGuideBookings();
          this.bookingsReady = false;
        },
        error: (err) => {
          console.log(`${logPath}/@User error`, err);
        }
      })
    );
  }

  public onDeclineBooking(id: number) : void{
    const functionName: string = `onDeclineBooking`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    this.subscriptions.push(
      this.guideService.declineBooking(id).subscribe({
        next: async (response) => {
          console.log(`${logPath}/@User response`, response);
          await this.getGuideBookings();
          this.bookingsReady = false;
        },
        error: (err) => {
          console.log(`${logPath}/@User error`, err);
        }
      })
    );
  }
}
