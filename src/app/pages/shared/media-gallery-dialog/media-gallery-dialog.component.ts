import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Gallery, GalleryRef } from 'ng-gallery';

@Component({
  selector: 'app-media-gallery-dialog',
  templateUrl: './media-gallery-dialog.component.html',
  styleUrls: ['./media-gallery-dialog.component.css']
})
export class MediaGalleryDialogComponent implements OnInit {
  galleryRef!: GalleryRef;

  constructor(
    public dialogRef: MatDialogRef<MediaGalleryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { images: string[] },
    private gallery: Gallery
  ) {}

  ngOnInit(): void {
    this.galleryRef = this.gallery.ref('mediaGallery'); // Get the gallery reference

    // Clear existing images to avoid duplicates
    this.galleryRef.reset();

    // Add new images to the gallery
    this.data.images.forEach((image) => {
      this.galleryRef.addImage({ src: image });
    });
  }

  // Remove an image from the gallery
  deleteImage(index: number): void {
    this.galleryRef.remove(index);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
