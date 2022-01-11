import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChatService, } from './chat.service';
import { environment } from 'src/environments/environment';

describe('ChatService', () => {
  let httpTestingController: HttpTestingController;
  let service: ChatService;

  // beforeEach(() => { service = new ChatService();
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule,]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ChatService);
  });
  afterEach(() => {
    // httpTestingController.verify();
  });
  // it('#getData should use GET to retrieve data', () => {
  //   service.getChatHistory().subscribe();
 
  //   const testRequest = httpTestingController.expectOne(`${environment.API_URL}/chat`);
 
  //   expect(testRequest.request.method).toEqual('GET');
  // });
 

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
  
  
// });
