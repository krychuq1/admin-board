import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-upload-img-gallery',
  templateUrl: './upload-img-gallery.component.html',
  styleUrls: ['./upload-img-gallery.component.scss']
})
export class UploadImgGalleryComponent implements OnInit {
  afuConfig;
  constructor(
    public cookieService: CookieService,
    public dialogRef: MatDialogRef<UploadImgGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.afuConfig = {
      multiple: false,
      maxSize: 1,
      formatsAllowed: '.jpg,.png',
      uploadAPI: {
        url: environment.baUrl + 'products/gallery/' + data,
        method: 'POST',
        headers: {
          Authorization : `Bearer ${cookieService.get('admin_token')}`
        },
      }
    };
  }

  ngOnInit(): void {
  }
  close($event) {
    this.dialogRef.close();
  }
}