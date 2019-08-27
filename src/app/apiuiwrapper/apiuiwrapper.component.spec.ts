import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiuiwrapperComponent } from './apiuiwrapper.component';

describe('ApiuiwrapperComponent', () => {
  let component: ApiuiwrapperComponent;
  let fixture: ComponentFixture<ApiuiwrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiuiwrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiuiwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
