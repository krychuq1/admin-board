import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImgGalleryComponent } from './upload-img-gallery.component';

describe('UploadImgGalleryComponent', () => {
  let component: UploadImgGalleryComponent;
  let fixture: ComponentFixture<UploadImgGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImgGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImgGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
