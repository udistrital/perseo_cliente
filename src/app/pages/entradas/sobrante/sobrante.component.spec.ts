import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SobranteComponent } from './sobrante.component';

describe('SobranteComponent', () => {
  let component: SobranteComponent;
  let fixture: ComponentFixture<SobranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobranteComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SobranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
