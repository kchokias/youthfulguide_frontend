import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-location-filters',
  templateUrl: 'location-filter.component.html',
  styleUrls: ['location-filter.component.css'],
})
export class LocationFilters {
  private componentName: string = `LocationFilters`;
  location = new FormControl();

  locations: string[] = ['Central Greece', 'Macedonia', 'Crete', 'Thrace'];

  @Output() locationChange = new EventEmitter<{ [key: string]: number }>();

  public constructor() {
    const lifecycleName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    this.location.setValue(this.locations);

    this.location.valueChanges.subscribe((newValue) => {
      this.emitTransformedStatuses();
    });
  }

  public getFilterColor(filter: string): string {
    const lifecycleName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Filters`, filter);

    switch (filter) {
      case 'Central Greece': return '#74569d';
      case 'Macedonia': return '#ff6d6a';
      case 'Crete': return '#0d9ce6';
      case 'Thrace': return '#f1db13';
      default: return '#74569d';
    }
  }

  public deselectFirstFilter(event: Event): void {
    const lifecycleName: string = `deselectFirstFilter`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Filters`, event);

    event.stopPropagation();
    const currentValues = this.location.value || [];
    if (currentValues.length > 0) {
      const updatedValues = currentValues.slice(1);
      this.location.setValue(updatedValues);
    }
  }

  private emitTransformedStatuses(): void {
    const lifecycleName: string = `emitTransformedStatuses`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Filters`, event);

    const transformedLocations = this.locations.reduce((acc, status) => {
      acc[status] = (this.location.value || []).includes(status) ? 1 : 0;
      return acc;
    }, {} as { [key: string]: number });

    this.locationChange.emit(transformedLocations);
  }
}
