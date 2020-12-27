import { UserAuthService } from './../services/user-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: Parse.User;

  constructor(private userAuthService: UserAuthService) {}

  async ngOnInit() {
    this.currentUser = await this.userAuthService.getCurrentUser();
  }

  async logOut(): Promise<void> {
    await this.userAuthService.logOut();
  }
}
