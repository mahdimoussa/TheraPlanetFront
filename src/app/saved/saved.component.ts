import { Component, OnInit } from '@angular/core';
import {PostService} from '@/services/post.service';
import {UserService} from '@/services/user.service';
import {Router} from '@angular/router';
import {User} from '@/models/user';
import {AuthenticationService} from '@/services/authentication.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private service: PostService, private userService: UserService, private router: Router, private authService: AuthenticationService) { }

  currentUser: User | null;
  saves: any = [];
  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser?.type === 'Therapist') {
      this.userService.checkApproved().subscribe(r => {
        let doc: any = {};
        let response: any = [];
        response = r;
        doc = response[0];
        if (!doc || doc.approved === false) {
          this.router.navigate(['/approveTherapist']);
        } else {
          // tslint:disable-next-line: no-shadowed-variable
          this.service.getSaved().subscribe(r => {
            console.log(r);
            this.saves = r;
          });

        }

      });
    }else{
      this.service.getSaved().subscribe(r => {
        console.log(r);
        this.saves = r;
      });
    }
  }



  // tslint:disable-next-line: typedef
  like(id: any, i: number) {
    this.service.like(id).subscribe(
      (result) => {
        window.location.reload();
      });
  }

  // tslint:disable-next-line: typedef
  savePost(id: any, i: number) {
    this.service.save(id).subscribe((response) => {
      console.log(response);

      if ((response as string).includes('unsaved')) {
        this.saves[i].post.saved = false;
      } else {
        this.saves[i].post.saved = true;
      }
    });

  }
}
