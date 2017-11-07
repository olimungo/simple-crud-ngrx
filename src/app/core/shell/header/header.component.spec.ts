import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellHeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: ShellHeaderComponent;
  let fixture: ComponentFixture<ShellHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
