import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPagetvComponent } from './player-pagetv.component';

describe('PlayerPagetvComponent', () => {
  let component: PlayerPagetvComponent;
  let fixture: ComponentFixture<PlayerPagetvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerPagetvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerPagetvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
