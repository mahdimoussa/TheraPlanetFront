import {AlertService} from './../services/alert.service';
import {PostService} from './../services/post.service';
import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {User} from '../models/user';
import {Post} from '../models/post';

import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import {Router} from "@angular/router";
import {TagsService} from "@/services/tags.service";

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
  currentUser: User | null;
  posts: Post[] = [];
  recentPosts: Post[] = [];
  fileNames: any = [];
  recentFileNames: any = [];
  firstIndex: number;
  lastIndex: number;
  pages: any = [];
  currentIndex: number;
  searchText: any;
  tags: any = [];

  constructor(
    private authenticationService: AuthenticationService,
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private tagsService: TagsService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    console.log(this.currentUser);

    if (this.currentUser?.type == 'Therapist') {
      this.userService.checkApproved().subscribe(r => {
        let doc: any = {};
        let response: any = [];
        response = r;
        doc = response[0];
        if (!doc || doc.approved == false) {
          this.router.navigate(['/approveTherapist']);
        } else {
          this.postService.getAll().subscribe((resultPosts) => {
            let response: any = {};
            response = resultPosts;
            this.posts = response.data;
            console.log(this.posts)
            this.firstIndex = response.form;
            this.lastIndex = response.last_page;
            this.currentIndex = 1;
            // this.pages = Array(this.lastIndex).fill().map((x,i)=>i+1);
            for (let i = 0; i < this.posts.length; i++) {
              let ext = this.getFileExtension(this.posts[i].media_url)
              this.fileNames.push(ext);
            }
            this.postService.getRecent().subscribe(r => {
              this.recentPosts = r;
              for (let i = 0; i < this.recentPosts.length; i++) {
                let ext = this.getFileExtension(this.recentPosts[i].media_url)
                this.recentFileNames.push(ext);
              }
              this.tagsService.getAll().subscribe(r =>{
                this.tags = r;
              })
            })
          });

        }

      })
    } else {
      this.postService.getAll().subscribe((resultPosts) => {
        let response: any = {};
        response = resultPosts;
        this.posts = response.data;
        console.log(this.posts)
        this.firstIndex = response.form;
        this.lastIndex = response.last_page;
        this.currentIndex = 1;
        // this.pages = Array(this.lastIndex).fill().map((x,i)=>i+1);
        for (let i = 0; i < this.posts.length; i++) {
          let ext = this.getFileExtension(this.posts[i].media_url)
          this.fileNames.push(ext);
        }

        this.postService.getRecent().subscribe(r => {
          this.recentPosts = r;
          for (let i = 0; i < this.recentPosts.length; i++) {
            let ext = this.getFileExtension(this.recentPosts[i].media_url)
            this.recentFileNames.push(ext);
          }
          this.tagsService.getAll().subscribe(r =>{
            this.tags = r;
          })
        })
      });
    }


  }

  like(post_id: number, post_index: number) {
    this.postService.like(post_id).subscribe(
      (result) => {
        if ((result as string).includes("unliked")) {
          this.posts[post_index].liked = false
          this.posts[post_index].likes_count -= 1
        } else {
          this.posts[post_index].liked = true
          this.posts[post_index].likes_count += 1

        }
        console.log(result);
      },
      (err) => console.log(err)
    );
  }

  save(post_id: number, post_index: number) {
    this.postService.save(post_id).subscribe((response) => {
      console.log(response);

      if ((response as string).includes('unsaved')) {
        this.posts[post_index].saved = false;
      } else {
        this.posts[post_index].saved = true;
      }
    });
  }

  getFileExtension(filename: string) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  pagination(pageNumber: number) {
    this.postService.getPagination(pageNumber).subscribe(r => {
      let response: any = {};
      response = r;
      this.posts = response.data;
      this.currentIndex = pageNumber;
      this.fileNames= [];
      for (let i = 0; i < this.posts.length; i++) {
        let ext = this.getFileExtension(this.posts[i].media_url)
        this.fileNames.push(ext);
      }
    });

  }

  keyPress($event: KeyboardEvent) {

    if ($event.code == 'Enter') {
      if (this.searchText) {
        this.postService.search(this.searchText).subscribe(r => {
          let response: any = {};

          response = r;
          console.log(response);
          this.posts = response.data;
          console.log(this.posts)
          this.firstIndex = response.form;
          this.lastIndex = response.last_page;
          this.currentIndex = 1;
          // this.pages = Array(this.lastIndex).fill().map((x,i)=>i+1);
          for (let i = 0; i < this.posts.length; i++) {
            let ext = this.getFileExtension(this.posts[i].media_url)
            this.fileNames.push(ext);
          }


        })
      } else {
        this.ngOnInit();
      }
    }

  }

  getPostsByTag(id: any) {
    this.postService.getPostsByTagId(id).subscribe(r=>{
      console.log(r);
      let response: any = {};
      response = r;
      this.posts = response.posts;
      this.firstIndex = response.form;
      this.lastIndex = response.last_page;
      this.currentIndex = 1;
      // this.pages = Array(this.lastIndex).fill().map((x,i)=>i+1);
      for (let i = 0; i < this.posts.length; i++) {
        let ext = this.getFileExtension(this.posts[i].media_url)
        this.fileNames.push(ext);
      }

    })
  }
}
