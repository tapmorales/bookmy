import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUrlsComponent } from './list-urls.component';

describe('ListUrlsComponent', () => {
  let component: ListUrlsComponent;
  let fixture: ComponentFixture<ListUrlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUrlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
