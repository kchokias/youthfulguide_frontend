import { Component } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  private componentName: string = `BookingsComponent`;
  public searchName:string = '';

  public searchByLastName(_event: any): void {
    const functionName: string = `searchByLastName`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
    console.log(`${logPath}/ @search Term`, _event);
  }
}
