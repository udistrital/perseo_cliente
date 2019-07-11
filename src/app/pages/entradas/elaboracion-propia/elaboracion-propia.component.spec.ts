import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElaboracionPropiaComponent } from './elaboracion-propia.component';

describe('ElaboracionPropiaComponent', () => {
  let component: ElaboracionPropiaComponent;
  let fixture: ComponentFixture<ElaboracionPropiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElaboracionPropiaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElaboracionPropiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
