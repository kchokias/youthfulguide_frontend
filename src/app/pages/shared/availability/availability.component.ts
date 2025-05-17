import { ChangeDetectorRef, Component, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';
import { GuideService } from '../../guide/guide.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent {
  private componentName: string = `AvailabilityComponent`;
  @Input() background: string = 'rgba(18, 19, 21, 0.85)';
  @Input() guideId:any;
  private subscriptions: Subscription[] = [];
  private userId:number = 1;
  public calendarReady:boolean = false;

  selectedDates: string[] = [];
  availableDates: string[] = [];
  bookedDates: string[] = [];
  calendarEvents: string[] = [];
  selectedValue: string = '';
  selectedAvailability: string = '';

  public selectedUser: any;

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
    private guideService: GuideService,
    private cdRef: ChangeDetectorRef,
    private confirmationDialog: ConfirmationDialogService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService) {}

  public async ngOnInit() {
    const functionName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    const receivedId = Number(this.route.snapshot.paramMap.get('id'));

    if (receivedId) {
      this.guideId = receivedId;
      await this.getUserId();
      console.log(`${logPath} ✅ Received ID from postMessage`, this.guideId);
    } else {
      await this.getUserId();
      console.log(`${logPath} Fallback getUserId`, this.userId);
    }

    await this.getUserProfile(this.userId);

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

    let selectedId:any;

    if (!this.guideId) {
      selectedId = this.userId;
    } else {
      selectedId = this.guideId;
    }

    return new Promise<void>((resolve) => {
      this.subscriptions.push(
        this.guideService.getGuideAvailability(selectedId).subscribe({
          next: (response) => {
            console.log(`${logPath}/@User response #1`, response);
            this.availableDates = response.availableDates.map((date: string) => this.convertToISO(date));
            this.bookedDates = response.bookedDates.map((date: string) => this.convertToISO(date));
            this.calendarReady = true;
            this.cdRef.detectChanges();
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

    const startDate = selection.startStr;
    const endDate = new Date(selection.endStr);
    endDate.setDate(endDate.getDate() - 1);
    const formattedEndDate = endDate.toISOString().split('T')[0];

    if (this.background === 'transparent') {
      this.selectedDates = [this.formatDate(startDate)];
    } else {
      const rangeStart = new Date(startDate);
      const rangeEnd = new Date(formattedEndDate);
      const finalStart = rangeStart > rangeEnd ? formattedEndDate : startDate;
      const finalEnd = rangeStart > rangeEnd ? startDate : formattedEndDate;

      this.selectedDates = [this.formatDate(finalStart), this.formatDate(finalEnd)];
    }

    console.log('Selected Date(s)', this.selectedDates);
  }

  public applyCustomClass(arg: any): any[] {
    const functionName: string = `applyCustomClass`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    const date = this.deFormatDate(arg.date);

    if (this.availableDates.includes(date)) {
      return ['green-date'];
    } else if (this.bookedDates.includes(date) && this.background !== 'transparent') {
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

  public deFormatDate(dateStr: string): string {
    const functionName: string = `formatDate`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  public allowOnlyDragSelection(selection: any): boolean {
    const functionName: string = `allowOnlyDragSelection`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    const start = selection.start;
    const end = selection.end;

    // Convert selected date to ISO for comparison
    const selectedDateISO = this.deFormatDate(start);

    if (this.background === 'transparent') {
      const isSingleDay = end.getTime() - start.getTime() === 24 * 60 * 60 * 1000;
      const isAvailable = this.availableDates.includes(selectedDateISO);
      return isSingleDay && isAvailable;
    }

    return end > start;
  }

  public async onAvailabilityChange() {
    const functionName: string = `onAvailabilityChange`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    if (!this.selectedDates[0] || !this.selectedDates[1]) return;

    let confirmed: any;

    if (this.selectedDates[0] !== this.selectedDates[1]) {
      confirmed = await this.confirmationDialog.open(`Are you sure you want to set ${this.selectedDates[0]} - ${this.selectedDates[1]} as ${this.selectedAvailability}?`);
    } else {
      confirmed = await this.confirmationDialog.open(`Are you sure you want to set ${this.selectedDates[0]} as ${this.selectedAvailability}?`);
    }

    if (!confirmed) return;

    this.subscriptions.push(
      this.guideService.setAvailability(this.userId, this.selectedDates[0], this.selectedDates[1], this.selectedAvailability).subscribe({
        next: async (response) => {
          console.log(`${logPath}/@User response`, response);
          this.snackbarService.open('Availability Updated Successfully', 'success');
          this.selectedAvailability = '';
          this.calendarReady = false;
          await this.getAvailability();
        },
        error: (err) => {
          console.log(`${logPath}/@User error`, err);
          this.snackbarService.open(err.error.message, 'error');
        }
      })
    );
  }

  public async requestBooking() {
    const functionName: string = `requestBooking`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    if (!this.selectedDates[0]) return;

    const confirmed = await this.confirmationDialog.open(`Do you want to request a booking on ${this.selectedDates[0]}?`, 'warning');
    if (!confirmed) return;

    this.subscriptions.push(
      this.guideService.requestBooking(this.userId, this.selectedDates[0], this.guideId).subscribe({
        next: async (response) => {
          console.log(`${logPath}/@User response`, response);
          this.snackbarService.open('Request submitted successfully', 'success');
          this.selectedAvailability = '';
          this.calendarReady = false;
          await this.getAvailability();
        },
        error: (err) => {
          console.log(`${logPath}/@User error`, err);
          this.snackbarService.open(err.error.message, 'error');
        }
      })
    );
  }

  private convertToISO(dateStr: string): string {
    const [day, month, year] = dateStr.split('.').map(Number);

    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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
}
