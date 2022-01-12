
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { Post } from '../models/Post';


import { PostService } from './post.service';

describe('PostService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const spy = jasmine.createSpyObj('ValueService', ['getValue']);

  let service: PostService;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  let valueServiceSpy: jasmine.SpyObj<PostService>;

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PostService(httpClientSpy);

    TestBed.configureTestingModule({

      providers:[
        {PostService,
         useValue: spy}
      ],

      imports: [HttpClientModule, RouterTestingModule,]

    });
    // httpMock = injector.get(HttpTestingController);
    injector = getTestBed();
    service = TestBed.inject(PostService);
    valueServiceSpy = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
  
  });
  afterEach(() => {
    // httpMock.verify();
  });
  const dummyChatListResponse = {
    data: [" "] 
  };
  it('getPostList() should return data', () => {
    service.getAll().subscribe((res) => {
      return expect(res).toHaveBeenCalled();
    });
    const req = httpMock.expectOne(`${environment.API_URL}/chat`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyChatListResponse);
  }); 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Should return all Posts', () => {
    expect(service.getAll()).toBeTrue
  })
  it('should use Service', () => {
    service = TestBed.inject(PostService);
    expect(service.getAll()).toBe
  });
});
// function asyncError(errorResponse: HttpErrorResponse): import("rxjs").Observable<unknown> {
//   throw new Error('Function not implemented.');
// }

// function asyncData(expectedPost: Post[]): import("rxjs").Observable<unknown> {
//   throw new Error('Function not implemented.');
// }

