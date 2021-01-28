import {PostService} from './../services/post.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "@/services/user.service";
import {TagsService} from "@/services/tags.service";
import {IDropdownSettings} from "ng-multiselect-dropdown/multiselect.model";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],

})
export class CreatePostComponent implements OnInit {
  caption: string;
  fileToUpload: File | null = null;
  tags: any = [];
  tagId: any;
  loading: boolean;
  selectedTags: any = [];
  private dropdownSettings: any = {};



  constructor(private postService: PostService, private router: Router, private userService: UserService, private tagsService: TagsService) {
  }

  ngOnInit() {
    this.loading = true;
    this.userService.checkApproved().subscribe(r => {
      let doc: any = {};
      let response: any = [];
      response = r;
      doc = response[0];
      if (!doc || doc.approved === false) {
        this.router.navigate(['/approveTherapist']);
      } else {
        this.tagsService.getAll().subscribe(r => {
          this.tags = r;
          console.log(this.tags);

          this.tagId = this.tags[0].id;
          console.log(this.tags[0]);

          this.loading = false;
        });
      }
    });

  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  upload() {
    let formData = new FormData();
    if (!this.caption) return;
    formData.append('caption', this.caption);
    formData.append('tag', this.tagId);

    if (this.fileToUpload !== null) {
      formData.append('media', this.fileToUpload, this.fileToUpload.name);
    }
    console.log("formmm",formData);
    this.postService.createPost(formData).subscribe(
      (response) => {
        console.log(response);

        this.router.navigateByUrl('/');
      },
      (err) => console.log(err)
    );
  }


}
