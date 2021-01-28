import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '@/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '@/models/user';
import { StarRatingComponent } from 'ng-starrating';
import { AuthenticationService } from '@/services/authentication.service';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '@/services/post.service';
import { ChatService } from '@/services/chat.service';
import { TagsService } from '@/services/tags.service';

@Component({
  selector: 'app-therapist',
  templateUrl: './therapist.component.html',
  styleUrls: ['./therapist.component.css'],
})
export class TherapistComponent implements OnInit {
  showNewMessage = false;
  message: string;
  editedPost: any = {};
  showEditPost: boolean;
  tags: any = [];
  editedPostMedia: any;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private postService: PostService,
    private chatService: ChatService,
    private tagsService: TagsService
  ) {}

  @ViewChild('editModal') editModal: ElementRef;

  modalReference: NgbModalRef;

  currentUser: User | null;
  user: User;
  reviews: any = [];
  id: any;
  averageRating: any;
  reviewMessage: any;
  reviewRating: any;
  reviewed = false;
  private ownProfile: boolean;
  userModel: any = {};
  loading: any;
  editClicked = false;
  posts: any = [];
  fileNames: any = [];

  ngOnInit(): void {
    this.loading = true;
    this.showEditPost = false;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.currentUser = this.authService.currentUserValue;
    this.userService.getUserById(this.id).subscribe((r) => {
      this.userModel = r;
      this.user = r;
      // tslint:disable-next-line: triple-equals
      this.ownProfile = this.user.id == this.currentUser?.id;
      this.reviews = this.user.reviews;
      let total = 0;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.reviews.length; i++) {
        total += this.reviews[i].rating;
        // tslint:disable-next-line: triple-equals
        if (this.reviews[i].user_id == this.currentUser?.id) {
          this.reviewed = true;
        }
      }
      this.averageRating = total / this.reviews.length;
      console.log(this.user);
      // tslint:disable-next-line: no-shadowed-variable
      this.postService.getPostsByTherapistId(this.id).subscribe((r) => {
        this.posts = r;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.posts.length; i++) {
          const ext = this.getFileExtension(this.posts[i].media_url);
          this.fileNames.push(ext);
        }

        // tslint:disable-next-line: no-shadowed-variable
        this.tagsService.getAll().subscribe((r) => {
          this.tags = r;
          this.loading = false;
        });
      });
    });
  }

  // tslint:disable-next-line: typedef
  onRate($event: {
    oldValue: number;
    newValue: number;
    starRating: StarRatingComponent;
  }) {
    this.reviewRating = $event.newValue;
  }

  // tslint:disable-next-line: typedef
  addReview() {
    const data: any = {};
    data.rating = this.reviewRating;
    data.review = this.reviewMessage;
    data.user_therapist_id = this.user.id;
    this.userService.addReview(data).subscribe((r) => {
      this.reviews.push(r);
      this.reviewMessage = '';
      this.reviewRating = 0;
      this.reviewed = true;
      console.log(r);
    });
  }

  // tslint:disable-next-line: typedef
  openModal() {
    this.editClicked = true;
    // this.modalService.open(this.editModal);
  }

  // tslint:disable-next-line: typedef
  handleFileInput(files: FileList) {
    this.userModel.profile_pic = files.item(0);
  }

  // tslint:disable-next-line: typedef
  handlePostInput(files: FileList) {
    this.editedPostMedia = files.item(0);
  }

  // tslint:disable-next-line: typedef
  updateProfile() {
    // let formData = new FormData();
    // formData.append("first_name",this.userModel.first_name);
    // formData.append("biography",this.userModel.biography);
    // formData.append("last_name",this.userModel.last_name);
    // formData.append("location",this.userModel.location);
    // formData.append("phone_number",this.userModel.phone_number);
    // formData.append("profile_number",this.userModel.profile_pic);

    this.userService.updatedData(this.userModel, this.user).subscribe((r) => {
      console.log(r);
      this.editClicked = false;
      window.location.reload();
    });
  }

  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: variable-name
  like(post_id: number, post_index: number) {
    this.postService.like(post_id).subscribe(
      (result) => {
        if ((result as string).includes('unliked')) {
          this.posts[post_index].liked = false;
          this.posts[post_index].likes_count -= 1;
        } else {
          this.posts[post_index].liked = true;
          this.posts[post_index].likes_count += 1;
        }
        console.log(result);
      },
      (err) => console.log(err)
    );
  }

  // tslint:disable-next-line: typedef
  getFileExtension(filename: string) {
    // tslint:disable-next-line: no-bitwise
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  }

  // tslint:disable-next-line: typedef
  deletePost(id: any) {
    this.postService.delete(id).subscribe((r) => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }

  // tslint:disable-next-line: typedef
  openNewMessage() {
    this.showNewMessage = true;
    this.message = '';
  }

  // tslint:disable-next-line: typedef
  sendMessage() {
    this.chatService.send(this.message, this.id)?.then((r) => {
      this.message = '';
      this.showNewMessage = false;
    });
  }

  // tslint:disable-next-line: typedef
  openEditPost(post: any) {
    this.showNewMessage = false;
    this.editedPost = post;
    this.showEditPost = true;
    console.log(this.showEditPost);
  }

  // tslint:disable-next-line: typedef
  updatePost() {
    console.log(this.editedPost);
    const formData = new FormData();
    if (!this.editedPost.caption) {
      return;
    }
    formData.append('caption', this.editedPost.caption);
    formData.append('tag', this.editedPost.tag);

    if (this.editedPostMedia != null) {
      formData.append('media', this.editedPostMedia, this.editedPostMedia.name);
    }

    this.postService.editPost(formData, this.editedPost.id).subscribe(
      (response) => {
        console.log(response);
        // window.location.reload();
      },
      (err) => console.log(err)
    );
  }

  // tslint:disable-next-line: typedef
  closeEditProfile() {
    this.editClicked = false;
  }

  // tslint:disable-next-line: typedef
  closeEditPost() {
    this.showEditPost = false;
  }

  // tslint:disable-next-line: typedef
  closeNewMessage() {
    this.showNewMessage = false;
  }
}
