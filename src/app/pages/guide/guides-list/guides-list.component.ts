import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { GuideService } from '../guide.service';

@Component({
  selector: 'app-guides-list',
  templateUrl: './guides-list.component.html',
  styleUrls: ['./guides-list.component.css']
})
export class GuidesListComponent implements OnInit {
  private componentName: string = `GuidesListComponent`;
  searchForm: FormGroup;
  private subscriptions: Subscription[] = [];
  public guidesReady:boolean = false;
  public guides: any[] = [];
  private today: Date = new Date();
  private endOfYear: Date = new Date( new Date().getFullYear(), 11, 31);

  constructor(private fb: FormBuilder,private guideService: GuideService) {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    this.searchForm = this.fb.group({
      dateRange: this.fb.group({
        start: [this.today],
        end: [this.endOfYear]
      }),
      region: ['all'],
      anywhere: [false],
      anytime: [false]
    });
  }

  public async ngOnInit() {
    const functionName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    await this.getGuides();
  }

  public async onSearch() {
    const functionName: string = `onSearch`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    this.guides = [];
    this.guidesReady = false;
    await this.getGuides();
  }

  public async getGuides(): Promise<void> {
    const lifecycleName: string = `getGuides`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    let start = this.formatDateToString(this.searchForm.get('dateRange.start')?.value);
    let end = this.formatDateToString(this.searchForm.get('dateRange.end')?.value);
    let region = this.searchForm.get('region')?.value;

    return new Promise<void>((resolve) => {
      this.subscriptions.push(
        this.guideService.getAvailableGuides(start, end, region).subscribe({
          next: (response) => {
            console.log(`${logPath}/@User response`, response);
            this.guides = response.guides;
            this.guidesReady = true;
            resolve();
          },
            error: (err) => {
              console.error(`${logPath}/@User error`, err);
              this.guidesReady = false;
              resolve();
                }
            })
        );
    });
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

  public onAnywhereToggle(event: Event): void {
    const functionName: string = `onAnywhereToggle`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    const isChecked = (event.target as HTMLInputElement).checked;
    if(isChecked) {
      this.searchForm.get('region')?.patchValue('all');
      this.searchForm.get('region')?.disable();
    } else {
      this.searchForm.get('region')?.enable();
    }
  }

  public onAnytimeToggle(event: Event): void {
    const functionName: string = `onAnytimeToggle`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    const isChecked = (event.target as HTMLInputElement).checked;
    if(isChecked) {
      this.searchForm.get('dateRange.start')?.patchValue(this.today);
      this.searchForm.get('dateRange.end')?.patchValue(this.endOfYear);
      this.searchForm.get('dateRange')?.disable();
    } else {
      this.searchForm.get('dateRange')?.enable();
    }
  }

  public viewProfile(id: number): void {
    const functionName: string = `viewProfile`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    console.log(`${logPath}/ @viewProfile`, id);

    const url = `${window.location.origin}/#/profile-preview`;
    const newWindow = window.open(url, '_blank');

    const sendMessage = () => {
      if (newWindow) {
        newWindow.postMessage({ id }, window.location.origin);
        console.log(`${logPath}/ @message sent`, id);
      }
    };

    setTimeout(sendMessage, 500);
  }
}
