import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorEditComponent } from './edit.component';

describe('ActorEditComponent', () => {
  let component: ActorEditComponent;
  let fixture: ComponentFixture<ActorEditComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ActorEditComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
