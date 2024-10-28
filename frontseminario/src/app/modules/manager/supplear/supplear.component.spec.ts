import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplearComponent } from './supplear.component';

describe('SupplearComponent', () => {
  let component: SupplearComponent;
  let fixture: ComponentFixture<SupplearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
