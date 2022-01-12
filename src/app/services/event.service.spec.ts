import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PostComponent } from '../components/post/post.component';

import { EventService } from './event.service';
import { PostService } from './post.service';

describe('EventService', () => {
  let service: EventService;
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule, RouterTestingModule,]

    });
    service = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
it('should make new post', () => {
  const service = TestBed.inject(EventService);
  spy = spyOn(service, 'newPost').and.callFake(()=>of("test"));
  service.newPost("test");
  expect(service.newPost).toHaveBeenCalled();
})
it('should make new like', () => {
  const service = TestBed.inject(EventService);
  spy = spyOn(service, 'newLike').and.callFake(()=>of("test"));
  service.newLike("test",0);
  expect(service.newLike).toHaveBeenCalled();
})
it('should delete like', () => {
  const service = TestBed.inject(EventService);
  spy = spyOn(service, 'deleteLike').and.callFake(()=>of("test"));
  service.deleteLike(0);
  expect(service.deleteLike).toHaveBeenCalled();
})
it('should upload profile image', () => {
  const service = TestBed.inject(EventService);
  spy = spyOn(service, 'uploadProfileImage').and.callFake(()=>of("test"));
  service.uploadProfileImage("test");
  expect(service.uploadProfileImage).toHaveBeenCalled();
})
it('should search profile', () => {
  const service = TestBed.inject(EventService);
  spy = spyOn(service, 'searchProfile').and.callFake(()=>of("test"));
  service.searchProfile("test");
  expect(service.searchProfile).toHaveBeenCalled();
})
});
