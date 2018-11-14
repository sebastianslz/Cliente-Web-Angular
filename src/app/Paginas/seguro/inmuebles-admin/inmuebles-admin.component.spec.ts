import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InmueblesAdminComponent } from './inmuebles-admin.component';

describe('InmueblesAdminComponent', () => {
  let component: InmueblesAdminComponent;
  let fixture: ComponentFixture<InmueblesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InmueblesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InmueblesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
