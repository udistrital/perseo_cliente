import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionBajaBienComponent } from './aprobacion-baja-bien.component';

describe('AprobacionBajaBienComponent', () => {
  let component: AprobacionBajaBienComponent;
  let fixture: ComponentFixture<AprobacionBajaBienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobacionBajaBienComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionBajaBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
