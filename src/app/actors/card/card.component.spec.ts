import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorCardComponent } from './card.component';

describe('ActorCardComponent', () => {
  let component: ActorCardComponent;
  let fixture: ComponentFixture<ActorCardComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ActorCardComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
