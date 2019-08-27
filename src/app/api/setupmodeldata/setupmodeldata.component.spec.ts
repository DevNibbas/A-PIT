import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupmodeldataComponent } from './setupmodeldata.component';

describe('SetupmodeldataComponent', () => {
  let component: SetupmodeldataComponent;
  let fixture: ComponentFixture<SetupmodeldataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupmodeldataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupmodeldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
