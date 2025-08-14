import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilsCdComponent } from './fils-cd.component';

describe('FilsCdComponent', () => {
  let component: FilsCdComponent;
  let fixture: ComponentFixture<FilsCdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [FilsCdComponent]
});
    fixture = TestBed.createComponent(FilsCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
