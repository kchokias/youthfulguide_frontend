import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  private componentName: string = `BookingsComponent`;
  public searchName:string = '';

  public ngOnInit(): void {
    const functionName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  public searchByLastName(_event: any): void {
    const functionName: string = `searchByLastName`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    console.log(`${logPath}/ @search Term`, _event);
  }
}
