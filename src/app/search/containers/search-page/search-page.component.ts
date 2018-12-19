import { Component, OnInit } from '@angular/core';
import { SearchService } from '@app/search/services';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Subject, zip } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { UserProfile } from '@app/search/components';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  options: string[] = [];
  searchTerm = '';

  searchTerm$ = new Subject();
  searchResults: UserProfile[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.getSearchOptions();
  }

  onSearchStart(searchTerm: string) {
    if (searchTerm.length) {
      this.searchTerm$.next(searchTerm);
    } else {
      this.options = [];
    }
  }

  onSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
    const params = new HttpParams({fromString: `q=${searchTerm}&per_page=20`});
    const starsParams = new HttpParams({fromString: `per_page=1`});

    return this.searchService.getUsers(params)
      .pipe(
        mergeMap(res => res.items),
        mergeMap((user: any) => {
          return zip(
            this.searchService.getUser(user.login),
            this.searchService.getUserStars(user.login, starsParams)
              .pipe(map(res => {
                // GitHub API does not provide a nice way to get total stars for a user.
                // The only way to get such value is to extract it from "Link" header
                const linkHeader = res.headers.get('Link');
                if (linkHeader) {
                  return this.searchService.parseUserTotalStars(linkHeader);
                } else {
                  return 0;
                }
              }))
          );
        })
      )
      .subscribe(([user, stars]) => {
        const userProfile = {
          avatarSrc: user.avatar_url,
          fullName: user.name,
          githubUser: user.login,
          description: user.bio,
          followers: user.followers,
          repos: user.public_repos,
          stars
        };

        this.searchResults = [...this.searchResults, userProfile];
      });
  }

  getSearchOptions() {
    this.searchTerm$
      .pipe(
        switchMap(st => {
          const params = new HttpParams({fromString: `q=${st}&per_page=3`});
          return this.searchService.getUsers(params)
            .pipe(map(res => res.items));
        })
      )
      .subscribe(results => {
        this.options = results.map(user => user.login);
      });
  }

}
