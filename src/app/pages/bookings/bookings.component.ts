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
    this.searchForm = this.fb.group({
      start: [new Date().toISOString().split('T')[0]],
      end: [null],
      region: ['all'],
      anywhere: [false],
      anytime: [false]
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
