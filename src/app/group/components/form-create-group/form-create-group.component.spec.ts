import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateGroupComponent } from './form-create-group.component';

describe('FormCreateGroupComponent', () => {
  let component: FormCreateGroupComponent;
  let fixture: ComponentFixture<FormCreateGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCreateGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
