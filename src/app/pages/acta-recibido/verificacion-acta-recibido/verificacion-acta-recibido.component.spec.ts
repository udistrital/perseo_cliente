import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionActaRecibidoComponent } from './verificacion-acta-recibido.component';

describe('VerificacionActaRecibidoComponent', () => {
  let component: VerificacionActaRecibidoComponent;
  let fixture: ComponentFixture<VerificacionActaRecibidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificacionActaRecibidoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionActaRecibidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
