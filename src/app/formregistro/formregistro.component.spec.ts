import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormregistroComponent } from './formregistro.component';

describe('FormregistroComponent', () => {
  let component: FormregistroComponent;
  let fixture: ComponentFixture<FormregistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormregistroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
