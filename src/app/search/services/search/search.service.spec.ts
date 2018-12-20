import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SearchService } from './search.service';
import { environment as env } from '@env/environment';
import { HttpParams } from '@angular/common/http';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [SearchService]
  }));

  it('should be able to get github users', inject([SearchService, HttpTestingController],
    (service: SearchService, httpMock: HttpTestingController) => {
      const params = new HttpParams({fromString: 'q=m0t0r&per_page=20'});
      service.getUsers(params)
        .subscribe(users => expect(users.items.length).toBe(2));

      const req = httpMock.expectOne(`${env.apiUrl}/search/users?q=m0t0r&per_page=20`);
      expect(req.request.method).toEqual('GET');

      req.flush({
        items: [
          {id: '1', name: 'John'},
          {id: '2', name: 'Tom'}
        ],
        metadata: {}
      });

      httpMock.verify();
    }));

  it('should be able to get the github user', inject([SearchService, HttpTestingController],
    (service: SearchService, httpMock: HttpTestingController) => {
      const username = 'm0t0r';
      service.getUser(username)
        .subscribe(user => expect(user.name).toBe('Vitaly'));

      const req = httpMock.expectOne(`${env.apiUrl}/users/m0t0r`);
      expect(req.request.method).toEqual('GET');

      req.flush({
        login: 'm0t0r',
        name: 'Vitaly'
      });

      httpMock.verify();
    }));

  it('should be able to get user stars', inject([SearchService, HttpTestingController],
    (service: SearchService, httpMock: HttpTestingController) => {
      const username = 'm0t0r';
      service.getUserStars(username)
        .subscribe(stars => expect(stars.body.items.length).toBe(3));

      const req = httpMock.expectOne(`${env.apiUrl}/users/m0t0r/starred`);
      expect(req.request.method).toEqual('GET');

      req.flush({
        items: [
          {id: '1'},
          {id: '2'},
          {id: '3'}
        ]
      });

      httpMock.verify();
    }));

  it('should be able to parse ', inject([SearchService], (service: SearchService) => {
    const header = `<https://api.github.com/user/3257149/starred?per_page=1&page=2>; rel="next",
      <https://api.github.com/user/3257149/starred?per_page=1&page=1119>; rel="last"`;

    expect(service.parseUserTotalStars(header)).toBe(1119);
  }));
});
