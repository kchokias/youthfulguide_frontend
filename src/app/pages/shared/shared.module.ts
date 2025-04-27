import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { DatepickerComponent } from "./datepicker/datepicker.component";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { LocationFilters } from "./location-filter/location-filter.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperDgComponent } from "./image-cropper/image-cropper.component";
import { StarRatingComponent } from "./star-rating/star-rating.component";
import { GalleryModule } from 'ng-gallery';
import { MediaGalleryDialogComponent } from "./media-gallery-dialog/media-gallery-dialog.component";
import { AvailabilityComponent } from "./availability/availability.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { CustomGalleryComponent } from "./custom-gallery/custom-gallery.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    DatepickerComponent,
    LocationFilters,
    ImageCropperDgComponent,
    StarRatingComponent,
    MediaGalleryDialogComponent,
    AvailabilityComponent,
    CustomGalleryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ImageCropperModule,
    GalleryModule,
    MatIconModule,
    FullCalendarModule
  ],
  providers: [],
  exports: [
    DatepickerComponent,
    LocationFilters,
    ImageCropperDgComponent,
    StarRatingComponent,
    MediaGalleryDialogComponent,
    AvailabilityComponent,
    CustomGalleryComponent
  ]
})
export class SharedModule { }
