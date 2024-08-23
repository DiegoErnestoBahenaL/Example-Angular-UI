import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuredAppComponent } from './secured-app.component';

describe('SecuredAppComponent', () => {
  let component: SecuredAppComponent;
  let fixture: ComponentFixture<SecuredAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecuredAppComponent]
    });
    fixture = TestBed.createComponent(SecuredAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
