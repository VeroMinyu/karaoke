import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordVideoComponent } from './record-video.component';

describe('RecordVideoComponent', () => {
  let component: RecordVideoComponent;
  let fixture: ComponentFixture<RecordVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
