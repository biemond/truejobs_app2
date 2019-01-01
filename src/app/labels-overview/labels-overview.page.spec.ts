import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsOverviewPage } from './labels-overview.page';

describe('LabelsOverviewPage', () => {
  let component: LabelsOverviewPage;
  let fixture: ComponentFixture<LabelsOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelsOverviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
