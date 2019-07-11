import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroActaRecibidoComponent } from './registro-acta-recibido.component';

describe('RegistroActaRecibidoComponent', () => {
  let component: RegistroActaRecibidoComponent;
  let fixture: ComponentFixture<RegistroActaRecibidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroActaRecibidoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroActaRecibidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
