import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PereCdComponent } from './pere-cd.component';

describe('PereCdComponent', () => {
  let component: PereCdComponent;
  let fixture: ComponentFixture<PereCdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PereCdComponent]
    });
    fixture = TestBed.createComponent(PereCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
