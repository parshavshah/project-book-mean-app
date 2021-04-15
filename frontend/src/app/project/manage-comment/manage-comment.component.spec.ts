import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommentComponent } from './manage-comment.component';

describe('ManageCommentComponent', () => {
  let component: ManageCommentComponent;
  let fixture: ComponentFixture<ManageCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
