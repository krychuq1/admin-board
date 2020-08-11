import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImgThumbnailComponent } from './upload-img-thumbnail.component';

describe('UploadImgThumbnailComponent', () => {
  let component: UploadImgThumbnailComponent;
  let fixture: ComponentFixture<UploadImgThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImgThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImgThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
