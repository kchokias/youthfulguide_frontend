import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { DatepickerComponent } from "./datepicker/datepicker.component";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { LocationFilters } from "./location-filter/location-filter.component";

@NgModule({
  declarations: [
    DatepickerComponent,
    LocationFilters
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  exports: [
    DatepickerComponent,
    LocationFilters]
})
export class SharedModule { }
