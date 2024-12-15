import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { BookingsComponent } from './bookings.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [BookingsComponent],
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      MaterialModule,
      ReactiveFormsModule,
      SharedModule
    ],
    exports: []
})
export class BookingsModule { }
