import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTopicoComponent } from './crear-topico.component';

describe('CrearTopicoComponent', () => {
  let component: CrearTopicoComponent;
  let fixture: ComponentFixture<CrearTopicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTopicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
