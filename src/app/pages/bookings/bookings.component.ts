import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  private componentName: string = `BookingsComponent`;
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;

    const today: Date = new Date();
    const endOfYear: Date = new Date(today.getFullYear(), 11, 31);

    this.searchForm = this.fb.group({
      dateRange: this.fb.group({
        start: [today],
        end: [endOfYear]
      }),
      region: ['all'],
      anywhere: [true],
      anytime: [true]
    });
  }

  public ngOnInit(): void {
    const functionName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  public onSearch(): void {
    const functionName: string = `onSearch`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    const { start, end, region } = this.searchForm.value;

    console.log(`${logPath}/@'Searching Guides for`, { start, end, region });
  }
}
