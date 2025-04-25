import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';
import { TravelerBookingsComponent } from './traveler-bookings/traveler-bookings.component';


@NgModule({
    declarations: [TravelerBookingsComponent],
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
export class TravelerModule { }
