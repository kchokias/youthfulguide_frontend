import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperDgComponent {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageBase64: string;

  constructor(
    public dialogRef: MatDialogRef<ImageCropperDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.imageBase64 = data.imageBase64;
    this.loadImageForCropping();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.blob) {
      this.convertBlobToBase64(event.blob).then(base64Image => {
        this.croppedImage = base64Image;
        console.log('base64Image:', base64Image);
      });
    } else {
      console.error('Error: Blob is null or undefined');
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  loadImageForCropping() {
    const fileEvent = {
      target: {
        files: [this.base64ToFile(this.imageBase64)]
      }
    };
    this.imageChangedEvent = fileEvent;
  }

  base64ToFile(base64: string): File {
    const byteString = atob(base64.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: 'image/png' });
    return new File([blob], 'image.png', { type: 'image/png' });
  }

  convertBlobToBase64(blob: Blob): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  public saveImage(): void {
    const functionName: string = `saveImage`;

    this.dialogRef.close(this.croppedImage);
  }
}
