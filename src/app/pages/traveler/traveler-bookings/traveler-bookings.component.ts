import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { UserService } from "../../user/user.service";
import { TravelerService } from "../traveler.service";
import { ConfirmationDialogService } from "../../shared/confirmation-dialog/confirmation-dialog.service";
import { SnackbarService } from "../../shared/snackbar/snackbar.service";

@Component({
  selector: 'app-traveler-bookings',
  templateUrl: './traveler-bookings.component.html',
  styleUrls: ['./traveler-bookings.component.css']
})

export class TravelerBookingsComponent implements OnInit, OnDestroy {
  private componentName: string = `TravelerBookingsComponent`;
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
    private travelerService: TravelerService,
    private userService: UserService,
    private confirmationDialog: ConfirmationDialogService,
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

    await this.getTravelerBookings();
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

  public async getTravelerBookings(): Promise<void> {
    const lifecycleName: string = `getTravelerBookings`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    let start = this.formatDateToString(this.searchForm.get('dateRange.start')?.value);
    let end = this.formatDateToString(this.searchForm.get('dateRange.end')?.value);
    let confirmed = this.searchForm.get('confirmed')?.value;
    let pending = this.searchForm.get('pending')?.value;
    let completed = this.searchForm.get('completed')?.value;

    return new Promise<void>((resolve) => {
      this.subscriptions.push(
        this.travelerService.getTravelerBookings(start, end, confirmed, pending, completed, this.userId.toString()).subscribe({
          next: (response: any[]) => {
            console.log(`${logPath}/@User response`, response);
            this.bookings = response;
            this.bookingsReady = true;
            resolve();
          },
            error: (err: any) => {
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
    await this.getTravelerBookings();
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

  public async onCancelBooking(id: number): Promise<void> {
    const functionName: string = `onCancelBooking`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    const confirmed = await this.confirmationDialog.open('Are you sure you want to decline this booking?');
    if (!confirmed) return;

    this.subscriptions.push(
      this.travelerService.cancelBooking(id, this.userId).subscribe({
        next: async (response: any) => {
          console.log(`${logPath}/@User response`, response);
          this.snackbarService.open('Booking Canceled!', 'success');
          await this.getTravelerBookings();
          this.bookingsReady = false;
        },
        error: (err: any) => {
          this.snackbarService.open(err.error.message, 'error'),
          console.log(`${logPath}/@User error`, err);
        }
      })
    );
  }

  public async onReviewBooking(id: number): Promise<void> {
    const functionName: string = `onReviewBooking`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    const result = await this.confirmationDialog.open('', 'success') as boolean | { confirmed: boolean, rating: number, review: string };

    if (typeof result === 'boolean') {
      if (!result) return;
    } else {
      if (!result.confirmed) return;
        this.subscriptions.push(
        this.travelerService.reviewBooking(id, this.userId,result.rating, result.review  ).subscribe({
          next: async (response: any) => {
            console.log(`${logPath}/@User response`, response);
            this.snackbarService.open('Booking reviewed!', 'success');
            await this.getTravelerBookings();
            this.bookingsReady = false;
          },
          error: (err: any) => {
            this.snackbarService.open(err.error.message, 'error'),
            console.log(`${logPath}/@User error`, err);
          }
        })
        );
      }

  }

  public viewProfile(id: number): void {
    const url = `${window.location.origin}/#/profile-preview/${id}`;
    window.open(url, '_blank');
  }
}
