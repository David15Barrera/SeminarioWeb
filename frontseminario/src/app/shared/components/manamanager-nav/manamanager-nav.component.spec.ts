import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManamanagerNavComponent } from './manamanager-nav.component';

describe('ManamanagerNavComponent', () => {
  let component: ManamanagerNavComponent;
  let fixture: ComponentFixture<ManamanagerNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManamanagerNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManamanagerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
