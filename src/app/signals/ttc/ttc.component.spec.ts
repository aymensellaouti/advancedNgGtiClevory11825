import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtcComponent } from './ttc.component';

describe('TtcComponent', () => {
  let component: TtcComponent;
  let fixture: ComponentFixture<TtcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [TtcComponent]
});
    fixture = TestBed.createComponent(TtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
