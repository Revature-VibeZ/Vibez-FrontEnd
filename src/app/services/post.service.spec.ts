import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Post } from '../models/Post';

import { PostService } from './post.service';

describe('PostService', () => {

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
    service = TestBed.inject(PostService);
    valueServiceSpy = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
  
  });
  // it('#getValue should return stubbed value from a spy', () => {
  //   const stubValue = Response;
  //   valueServiceSpy.create.and.returnValues(stubValue)
  
  //   expect(PostService.toString())
  //     .toBe(stubValue, 'service returned stub value');
  // });
  // it('should return expected post (HttpClient called once)', (done: DoneFn) => {
  //   const expectedPost: Post[] = 
  //     [{ authorId: 1, comments: [] , content: " ", creationDate: " ", friends: [], image: " ",id: 1, parentId: 1, title:" ", likes: [],}];

  //     httpClientSpy.get.and.returnValue(asyncData(expectedPost));

  //     service.getAll().subscribe(
  //       post => {
  //         expect(post).toHaveBeenCalled
  //         done();
  //       },
  //       done.fail
  //     );
  //     expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  //   });
    
  //   it('should return an error when the server returns a 404', (done: DoneFn) => {
  //     const errorResponse = new HttpErrorResponse({
  //       error: 'test 404 error',
  //       status: 404, statusText: 'Not Found'
  //     });
    
  //     httpClientSpy.get.and.returnValue(asyncError(errorResponse));
    
  //     service.getAll().subscribe(
  //       post => done.fail('expected an error, not heroes'),
  //       error  => {
  //         expect(error.message).toContain('test 404 error');
  //         done();
  //       }
  //     );
  //   });

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

