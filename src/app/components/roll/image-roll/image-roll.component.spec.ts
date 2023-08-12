import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageRollComponent } from './image-roll.component';

describe('ImageRollComponent', () => {
  let component: ImageRollComponent;
  let fixture: ComponentFixture<ImageRollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageRollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
