import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterCompComponent } from './matter-comp.component';

describe('MatterCompComponent', () => {
  let component: MatterCompComponent;
  let fixture: ComponentFixture<MatterCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatterCompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatterCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
