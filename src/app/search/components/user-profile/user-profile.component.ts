import { ChangeDetectionStrategy, Component, NgModule, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '@app/app-material.module';

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
export class UserProfileComponent implements OnInit {
  @Input() userProfile: UserProfile;

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  imports: [CommonModule, AppMaterialModule],
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent]
})
export class UserProfileModule { }
