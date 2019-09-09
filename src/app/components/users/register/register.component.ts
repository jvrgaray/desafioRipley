import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { UserInterface } from 'src/app/models/user-interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage
  ) { }

  public user: UserInterface = {
    name: '',
    email: '',
    password: ''
  };
  public isError = false;
  public msgError = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
  }

  onAddUser() {
    this.authService.registerUser(this.user.email, this.user.password)
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => {this.msgError = err.error.error.details.messages.email;
                     this.onIsError(err);
                  });
  }

  onLoginFacebook() {
    this.authService.loginFacebookUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => this.onIsError(err));
  }

  onLoginGoogle() {
    this.authService.loginGoogleUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => this.onIsError(err));
  }

  onLoginRedirect(): void {
    this.router.navigate(['catalogo/lista']);
  }

  onIsError(err): void {
    this.isError = true;
    console.log('err', err.message())
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
}
