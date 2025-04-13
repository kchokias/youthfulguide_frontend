import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { UserService } from "../../user/user.service";
import { MatDialog } from "@angular/material/dialog";
import { GuideService } from "../guide.service";

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
    private userService: UserService) {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    this.searchForm = this.fb.group({
      dateRange: this.fb.group({
        start: [this.today],
        end: [this.endOfYear]
      }),
      upcoming: [true],
      pending: [true],
      completed: [true]
    });
  }

  public async ngOnInit() {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    await this.getUserId();
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

  public ngOnDestroy(): void {
    const lifecycleName: string = `ngOnDestroy`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Clients`);

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

  public async onSearch() {
    const functionName: string = `onSearch`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    this.bookings = [];
    this.bookingsReady = false;
    // await this.getBookings();
  }
}
