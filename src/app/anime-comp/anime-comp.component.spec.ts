import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeCompComponent } from './anime-comp.component';

describe('AnimeCompComponent', () => {
  let component: AnimeCompComponent;
  let fixture: ComponentFixture<AnimeCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeCompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimeCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
