import {Component, Inject, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-upload-img-thumbnail',
  templateUrl: './upload-img-thumbnail.component.html',
  styleUrls: ['./upload-img-thumbnail.component.scss']
})
export class UploadImgThumbnailComponent implements OnInit {
  afuConfig;
  constructor(cookieService: CookieService,
              public dialogRef: MatDialogRef<UploadImgThumbnailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) {
    this.afuConfig = {
      multiple: false,
      maxSize: 1,
      formatsAllowed: '.jpg,.png',
      uploadAPI: {
        url: environment.baUrl + 'products/thumbnail/' + data,
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
