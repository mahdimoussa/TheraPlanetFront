import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {first, map, catchError, switchMap} from 'rxjs/operators';
import { User } from '../models/user';
import { config } from '../config';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import firebase from "firebase";
import auth = firebase.auth;
// import {UserService} from "@/services/user.service";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";





@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  // user$ : SocialUser;
  constructor(private http: HttpClient,
              // private afAuth: AngularFireAuth,
              // private afs: AngularFirestore,
              // private router: Router,
              // private authService: SocialAuthService

              ) {
    const s = localStorage.getItem('currentUser');
    if (s != null) {
      this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(s));
    } else {
      this.currentUserSubject = new BehaviorSubject<User | null>(null);
      // this.authService.authState.subscribe((user) =>{
      //   this.user$ = user;
      //   if
      // })
    }
    // this.user$ = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.afs.doc<User>(`accounts/${user.uid}`).valueChanges();
    //     }
    //   })
    // );
    this.currentUser = this.currentUserSubject?.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject?.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${config.apiUrl}/api/auth/login`, {
        email,
        password,
        remember_me: true,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          // this.http.get(`${config.apiUrl}/api/setonline`).subscribe(r =>{
          //
          // });

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null

    this.http.get(`${config.apiUrl}/api/setoffline/`+this.currentUserValue?.id).subscribe(r => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    });

    // this.authService.signOut();
  }

  resetPasswordRequest(email: any) {
    let data: any = {};
    data.email = email;
    return this.http.post(`${config.apiUrl}/api/forgot`,data);
  }

  resetPassword(data: any, token: any) {
    let d: any = {};
    d.data = data;
    d.token = token;
    return this.http.post(`${config.apiUrl}/api/resetpassword`,d);
  }

  // async googleSignin(){
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  // }

  // private updateUserData(credential: any) {
  //   if(this.checkIfNew(credential.email){
  //     let user: any = {};
  //     user.first_name = credential.displayName;
  //     user.last_name = "";
  //     user.profile_pic = credential.photoURL;
  //     user.email = credential.email;
  //     user.password = credential.passwor
  //     this.userService.register();
  //     // register
  //   }else{
  //     this.login(credential.email, credential.password);
  //   }
  // }

  // private checkIfNew(email: string ) {
  //   return this.http.post(`${config.apiUrl}/api/checkNew`,email);
  // }
}
