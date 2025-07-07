import { Component, Inject, OnInit } from '@angular/core';
import { Gallery, GalleryRef } from 'ng-gallery';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MediaItem } from '../../guide/guide.model';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

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
  public role: string = '';

  constructor(
    public dialogRef: MatDialogRef<MediaGalleryDialogComponent>, private confirmationDialog: ConfirmationDialogService,
    @Inject(MAT_DIALOG_DATA) public data: { images: MediaItem[] },
    private gallery: Gallery,
    private userService: UserService
  ) {
    this.images = data.images;
  }

  public async ngOnInit() {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    await this.getUserRole();

    this.galleryRef = this.gallery.ref('mediaGallery');

    this.galleryRef.reset();

    this.images.forEach((image) => {
      this.galleryRef.addImage({ src: image.media_data });
    });

    console.log(`${logPath}/@this.images error`, this.images);
  }

  public async getUserRole(): Promise<void> {
    const lifecycleName: string = `getUserRole`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    return new Promise<void>((resolve, reject) => {
      this.subscriptions.push(
        this.userService.getUserRoleFromToken().subscribe({
          next: (response) => {
            this.role = response.role;
            console.log(`${logPath}/@User response`, response);
            resolve();
          },
          error: (err) => {
            // this.error = err; // Handle errors
            console.log(`${logPath}/@User error`, err);
            reject(err);
          }
        })
      );
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  public async deleteImage(index: number): Promise<void> {

    const lifecycleName: string = `getGuideMedia`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    const confirmed = await this.confirmationDialog.open('Are you sure you want to delete this image?');
    if (!confirmed) return;

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
