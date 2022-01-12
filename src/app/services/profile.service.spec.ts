import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService],

      imports: [HttpClientModule, RouterTestingModule,]

    });
    // httpMock = injector.get(HttpTestingController);
    service = TestBed.inject(ProfileService);
    injector = getTestBed();
  });
  afterEach(() => {
    // httpMock.verify();
  }); 
  const dummyChatListResponse = {
    data: [" "] 
  }; 
  // it('getChatList() should return data', () => {
  //   service().subscribe((res) => {
  //     return expect(res).toHaveBeenCalled
  //   });
  //   const req = httpMock.expectOne(`${environment.API_URL}/chat`);
  //   expect(req.request.method).toBe('GET');
  //   req.flush(dummyChatListResponse);
  // }); 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
