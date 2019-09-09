import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { UserInterface } from '../models/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then( userData => resolve(userData),
      err => reject(err));
    });
  }

  loginFacebookUser() {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  loginGoogleUser() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logoutUser() {
    return this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  setUser(user: UserInterface): void {
    const userString = JSON.stringify(user);
    localStorage.setItem('currentUser', userString);
  }
}
