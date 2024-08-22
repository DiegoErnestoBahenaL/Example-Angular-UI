import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLibraryComponent } from './search-library.component';

describe('SearchLibraryComponent', () => {
  let component: SearchLibraryComponent;
  let fixture: ComponentFixture<SearchLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchLibraryComponent]
    });
    fixture = TestBed.createComponent(SearchLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
