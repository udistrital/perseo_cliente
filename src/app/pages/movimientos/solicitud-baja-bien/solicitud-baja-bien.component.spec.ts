import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudBajaBienComponent } from './solicitud-baja-bien.component';

describe('SolicitudBajaBienComponent', () => {
  let component: SolicitudBajaBienComponent;
  let fixture: ComponentFixture<SolicitudBajaBienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudBajaBienComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudBajaBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
