import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTopicoComponent } from './detalle-topico.component';

describe('DetalleTopicoComponent', () => {
  let component: DetalleTopicoComponent;
  let fixture: ComponentFixture<DetalleTopicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleTopicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
