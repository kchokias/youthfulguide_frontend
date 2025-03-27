import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user/user.service';
import { BookingService } from '../bookings/bookings.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent {
  private componentName: string = `AvailabilityComponent`;
  private subscriptions: Subscription[] = [];
  private userId:number = 1;
  public calendarReady:boolean = false;

  selectedDates: string[] = [];
  availableDates: string[] = [];
  bookedDates: string[] = [];
  calendarEvents: string[] = [];
  selectedValue: string = '';
  selectedAvailability: string = '';

  public calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'threeMonthView',
    selectable: true,
    unselectAuto: false,
    height: 'auto',
    select: this.handleDateSelection.bind(this),
    selectAllow: this.allowOnlyDragSelection.bind(this),
    dayCellClassNames: this.applyCustomClass.bind(this),
    views: {
      threeMonthView: {
        type: 'dayGrid',
        duration: { months: 3 },
        buttonText: '3 Months'
      }
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,threeMonthView'
    }
  };

  constructor(
    private userService: UserService,
    private bookingsService: BookingService) {}

  public async ngOnInit() {
    const functionName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    await this.getUserId();

    await this.getAvailability();
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

  public async getAvailability(): Promise<void> {
    const lifecycleName: string = `getAvailability`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

      return new Promise<void>((resolve) => {
        this.subscriptions.push(
          this.bookingsService.getGuideAvailability(this.userId).subscribe({
            next: (response) => {
              console.log(`${logPath}/@User response $1`, response);
              this.availableDates = response.availableDates;
              this.bookedDates = response.bookedDates;
              this.calendarReady = true;
              resolve();
            },
            error: (err) => {
              console.error(`${logPath}/@User error`, err);
              this.calendarReady = false;
              resolve();
            }
          })
        );
      });
  }

  public handleDateSelection(selection: any): void {
    const functionName: string = `handleDateSelection`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    let startDate = selection.startStr;
    let endDate = new Date(selection.end);

    endDate.setDate(endDate.getDate() - 1);
    let formattedEndDate = endDate.toISOString().split('T')[0];

    if (new Date(startDate) > new Date(formattedEndDate)) {
      [startDate, formattedEndDate] = [formattedEndDate, startDate];
    }

    this.selectedDates = [this.formatDate(startDate), this.formatDate(formattedEndDate)];

    console.log('Selected Date Range: $1', this.selectedDates);
  }

  public applyCustomClass(arg: any): any[] {
    const functionName: string = `applyCustomClass`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    const date = this.formatDate(arg.date.toISOString().split('T')[0]);

    if (this.availableDates.includes(date)) {
      return ['green-date'];
    } else if (this.bookedDates.includes(date)) {
      return ['yellow-date'];
    }
    return ['red-date'];
  }

  public formatDate(dateStr: string): string {
    const functionName: string = `formatDate`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  public allowOnlyDragSelection(selection: any): boolean {
    const functionName: string = `allowOnlyDragSelection`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    const start = selection.start;
    const end = selection.end;

    return end > start;
  }

  public async onAvailabilityChange() {
    const functionName: string = `onAvailabilityChange`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    this.subscriptions.push(
      this.bookingsService.setAvailability(this.userId, this.selectedDates[0], this.selectedDates[1], this.selectedAvailability).subscribe({
        next: async (response) => {
          console.log(`${logPath}/@User response`, response);
          this.calendarReady = false;
          await this.getAvailability();
        },
        error: (err) => {
          console.log(`${logPath}/@User error`, err);
        }
      })
    );

  }
}
