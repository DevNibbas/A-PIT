import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabcontrolledhomeComponent } from './tabcontrolledhome.component';

describe('TabcontrolledhomeComponent', () => {
  let component: TabcontrolledhomeComponent;
  let fixture: ComponentFixture<TabcontrolledhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabcontrolledhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabcontrolledhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
