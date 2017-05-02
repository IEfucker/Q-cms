/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TListComponent } from './t-list.component';

describe('TListComponent', () => {
  let component: TListComponent;
  let fixture: ComponentFixture<TListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
