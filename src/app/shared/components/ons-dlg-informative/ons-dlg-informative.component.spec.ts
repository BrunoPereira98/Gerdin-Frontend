import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsDlgInformativeComponent } from './ons-dlg-informative.component';

describe('OnsDlgInformativeComponent', () => {
  let component: OnsDlgInformativeComponent;
  let fixture: ComponentFixture<OnsDlgInformativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsDlgInformativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnsDlgInformativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
