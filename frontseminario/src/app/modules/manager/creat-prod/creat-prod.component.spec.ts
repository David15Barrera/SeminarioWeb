import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatProdComponent } from './creat-prod.component';

describe('CreatProdComponent', () => {
  let component: CreatProdComponent;
  let fixture: ComponentFixture<CreatProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatProdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
