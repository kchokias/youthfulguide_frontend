import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { GuidesListComponent } from './guides-list/guides-list.component';
import { SharedModule } from '../shared/shared.module';
import { GuideProfilePreviewComponent } from './guide-profile-preview/guide-profile-preview.component';
import { AvailabilityComponent } from '../shared/availability/availability.component';


@NgModule({
    declarations: [GuidesListComponent, GuideProfilePreviewComponent],
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
export class GuideModule { }
