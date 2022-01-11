import { HttpClientModule } from '@angular/common/http';
import { TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChatService, } from './chat.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('ChatService', () => {
  let injector: TestBed;
  let service: ChatService;
  let httpMock: HttpTestingController;

  beforeEach(() => { 
    TestBed.configureTestingModule({
      providers: [ChatService],
      imports: [HttpClientModule, RouterTestingModule, HttpClientTestingModule]
     
    });
    injector = getTestBed();
    service = TestBed.inject(ChatService);
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  }); 
  const dummyChatListResponse = {
    data: [" "] 
  };  
  it('getChatList() should return data', () => {
    service.getChatHistory().subscribe((res) => {
      return expect(res).toHaveBeenCalled
    });
    const req = httpMock.expectOne(`${environment.API_URL}/chat`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyChatListResponse);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});
