import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupcookiesComponent } from './setupcookies.component';

describe('SetupcookiesComponent', () => {
  let component: SetupcookiesComponent;
  let fixture: ComponentFixture<SetupcookiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupcookiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupcookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
