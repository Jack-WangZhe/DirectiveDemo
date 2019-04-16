import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftDivComponent } from './left-div.component';

describe('LeftDivComponent', () => {
  let component: LeftDivComponent;
  let fixture: ComponentFixture<LeftDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
