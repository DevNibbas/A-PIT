import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincontainerComponent } from './maincontainer.component';

describe('MaincontainerComponent', () => {
  let component: MaincontainerComponent;
  let fixture: ComponentFixture<MaincontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaincontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaincontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
