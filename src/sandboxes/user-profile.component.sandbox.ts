import { sandboxOf } from 'angular-playground';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent, UserProfileModule } from '@app/search/components';

export default sandboxOf(UserProfileComponent, {
  imports: [
    HttpClientModule,
    UserProfileModule
  ],
  declareComponent: false
})
  .add('default state', {
    styles: [`
       :host {
         display: block;
         padding: 16px;
         height: 100vh;
     }
    `],
    context: {
      userProfile: {
        avatarSrc: 'https://avatars1.githubusercontent.com/u/57936?v=4',
        fullName: 'John Doe',
        githubUser: 'johndoe',
        description: 'Doing cool stuff on the web',
        stars: 257,
        followers: 125,
        repos: 54
      }
    },
    template: `
      <app-user-profile [userProfile]="userProfile"></app-user-profile>
    `
  });
