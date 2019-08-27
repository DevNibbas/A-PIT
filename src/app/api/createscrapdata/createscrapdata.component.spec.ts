import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatescrapdataComponent } from './createscrapdata.component';

describe('CreatescrapdataComponent', () => {
  let component: CreatescrapdataComponent;
  let fixture: ComponentFixture<CreatescrapdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatescrapdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatescrapdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
