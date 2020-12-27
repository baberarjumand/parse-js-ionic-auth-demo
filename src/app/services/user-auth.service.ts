import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import * as Parse from 'parse';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private router: Router) {}

  newUserSignUp(username: string, password: string): Promise<void> {
    // console.log('Username:', username);
    // console.log('Password:', password);

    return new Promise(async (resolve, reject) => {
      const user = new Parse.User();
      user.set('username', username);
      user.set('password', password);

      try {
        await user.signUp();
        resolve();
      } catch (error) {
        console.error('Error in new user sign up:', error);
        reject();
      }
    });
  }

  async logOut(): Promise<void> {
    await Parse.User.logOut();

    this.router.navigate(['login']);
  }

  async getCurrentUser(): Promise<Parse.User> {
    return new Promise(async (resolve, reject) => {
      const currentUser = await Parse.User.current();

      if (currentUser) {
        resolve(currentUser);
      } else {
        reject(null);
      }
    });
  }

  async checkIfUserExists(username: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = new Parse.Query(Parse.User);
        query.equalTo('username', username);
        const user = await query.find();
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      } catch (error) {
        console.error('Error checking if user exists:', error);
        reject();
      }
    });
  }

  async login(username: string, password: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await Parse.User.logIn(username, password);
        this.router.navigate(['home']);
        resolve();
      } catch (error) {
        console.error('Error logging in:', error);
        reject();
      }
    });
  }
}
