import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestVideoComponent } from './test-video.component';

describe('TestVideoComponent', () => {
  let component: TestVideoComponent;
  let fixture: ComponentFixture<TestVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
