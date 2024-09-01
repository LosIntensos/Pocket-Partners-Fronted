import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreateGroupComponent } from './page-create-group.component';

describe('PageCreateGroupComponent', () => {
  let component: PageCreateGroupComponent;
  let fixture: ComponentFixture<PageCreateGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageCreateGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageCreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
