import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import {UserService} from "@/services/user.service";
import {Router} from "@angular/router";
import {User} from "@/models/user";
import {AuthenticationService} from "@/services/authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  bio: string;
  fileToUpload: File | null = null;
  user: User | null;

  constructor(private postService: PostService, private userService: UserService, private  router: Router, private  authService: AuthenticationService) {}

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    console.log(this.user);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  upload() {
    let data:any = {}
    data.biography = this.bio;

    if (this.fileToUpload !== null) {
      data.media = this.fileToUpload;
    }
    this.userService.updatedData(data, this.user).subscribe(r =>{
      console.log(r);
    })
    // this.postService.createPost(formData).subscribe(
    //   (response) => console.log(response),
    //   (err) => console.log(err)
    // );
  }

  updateProfile() {
    let formData = new FormData();

    if (this.user) {

      formData.append('first_name', this.user.first_name);
      formData.append('last_name', this.user.last_name);
      formData.append('phone_number', this.user.phone_number);


      if (this.fileToUpload !== null) {
        formData.append('profile_pic', this.fileToUpload, this.fileToUpload.name);
      }
debugger;

      this.userService.updateUserProfile(formData, this.user.id).subscribe(r => {
        console.log(r);
      })
    }
  }




}
