import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
  }));

  it('should be able to parse ', inject([SearchService], (service: SearchService) => {
    const header = `<https://api.github.com/user/3257149/starred?per_page=1&page=2>; rel="next", <https://api.github.com/user/3257149/starred?per_page=1&page=1119>; rel="last"`;

    expect(service.parseUserTotalStars(header)).toBe(1119);
  }));
});
