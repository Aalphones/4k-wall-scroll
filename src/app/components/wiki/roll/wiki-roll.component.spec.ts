import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiRollComponent } from './wiki-roll.component';

describe('WikiRollComponent', () => {
  let component: WikiRollComponent;
  let fixture: ComponentFixture<WikiRollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiRollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WikiRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
