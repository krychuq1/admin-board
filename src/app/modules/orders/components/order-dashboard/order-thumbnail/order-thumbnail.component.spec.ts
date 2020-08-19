import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderThumbnailComponent } from './order-thumbnail.component';

describe('OrderThumbnailComponent', () => {
  let component: OrderThumbnailComponent;
  let fixture: ComponentFixture<OrderThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
