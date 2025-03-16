import { Component, Inject, OnInit } from '@angular/core';
import { Gallery, GalleryRef } from 'ng-gallery';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MediaItem } from '../../guide/guide.model';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-media-gallery-dialog',
  templateUrl: './media-gallery-dialog.component.html',
  styleUrls: ['./media-gallery-dialog.component.css']
})
export class MediaGalleryDialogComponent implements OnInit {
  galleryRef!: GalleryRef;
  images: MediaItem[];
  private subscriptions: Subscription[] = [];
  private componentName: string = `MediaGalleryDialogComponent`;

  constructor(
    public dialogRef: MatDialogRef<MediaGalleryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { images: MediaItem[] },
    private gallery: Gallery,
    private userService: UserService
  ) {
    this.images = data.images;
  }

  ngOnInit(): void {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    this.galleryRef = this.gallery.ref('mediaGallery');

    this.galleryRef.reset();

    this.images.forEach((image) => {
      this.galleryRef.addImage({ src: image.media_data });
    });

    console.log(`${logPath}/@this.images error`, this.images);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteImage(index: number): void {
    const lifecycleName: string = `getGuideMedia`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    this.subscriptions.push(
      this.userService.deleteMediaPhoto(this.images[index].id).subscribe({
          next: (response) => {
            this.data.images.splice(index, 1);
            this.galleryRef.remove(index);
          },
          error: (err) => {
            console.log(`${logPath}/@User error`, err);
          }
      })
  );
  }
}
