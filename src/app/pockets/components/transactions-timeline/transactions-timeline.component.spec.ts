import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsTimelineComponent } from './transactions-timeline.component';

describe('TransactionsTimelineComponent', () => {
  let component: TransactionsTimelineComponent;
  let fixture: ComponentFixture<TransactionsTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionsTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
