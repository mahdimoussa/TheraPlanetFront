import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import './content/app.less';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from "@angular/fire/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User | null = null;
  private url: string;
  data:any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
      private afs: AngularFirestore
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.url = this.router.url;

    }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  homePage(){
     if(this.router.url == '/') return  true ;
     else return  false;
  }

}
