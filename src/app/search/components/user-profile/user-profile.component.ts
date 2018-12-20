import { ChangeDetectionStrategy, Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '@app/app-material.module';
import { BreakpointObserver } from '@angular/cdk/layout';

export interface UserProfile {
  avatarSrc: string;
  fullName: string;
  githubUser: string;
  description: string;
  stars: number;
  followers: number;
  repos: number;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {
  @Input() userProfile: UserProfile;

  constructor(private breakpointObserver: BreakpointObserver) {}

  navigateToUserProfile(githubUser) {
    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 960px)');

    if (isSmallScreen) {
      window.location.href = `https://github.com/${githubUser}`;
    }
  }

}

@NgModule({
  imports: [CommonModule, AppMaterialModule],
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent]
})
export class UserProfileModule { }
