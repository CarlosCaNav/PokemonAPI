import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoComponent } from './campo.component';

describe('CampoComponent', () => {
  let component: CampoComponent;
  let fixture: ComponentFixture<CampoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampoComponent]
    });
    fixture = TestBed.createComponent(CampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
