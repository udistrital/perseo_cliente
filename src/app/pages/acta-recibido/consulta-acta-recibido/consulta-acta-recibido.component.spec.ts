import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaActaRecibidoComponent } from './consulta-acta-recibido.component';

describe('ConsultaActaRecibidoComponent', () => {
  let component: ConsultaActaRecibidoComponent;
  let fixture: ComponentFixture<ConsultaActaRecibidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaActaRecibidoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaActaRecibidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
