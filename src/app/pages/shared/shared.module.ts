import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { DatepickerComponent } from "./datepicker/datepicker.component";

@NgModule({
  declarations: [
    DatepickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [DatepickerComponent]
})
export class SharedModule { }
