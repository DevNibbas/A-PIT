import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabcontainerComponent } from './tabcontainer.component';

describe('TabcontainerComponent', () => {
  let component: TabcontainerComponent;
  let fixture: ComponentFixture<TabcontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabcontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
