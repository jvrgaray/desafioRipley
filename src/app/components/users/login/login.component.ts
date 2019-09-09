import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { isError } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) { }

  public email = '';
  public pass = '';

  public isError = false;

  ngOnInit() {
  }

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.pass)
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => this.onIsError(err));
  }

  onLoginFacebook() {
    //this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    this.authService.loginFacebookUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => this.onIsError(err));
  }

  onLoginGoogle() {
    //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.authService.loginGoogleUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => this.onIsError(err));
  }

  onLogout() {
    this.authService.logoutUser();
  }

  onLoginRedirect(): void {
    this.router.navigate(['catalogo/lista']);
  }

  onIsError(err): void {
    this.isError = true;
    console.log('err', err.message);
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
}
