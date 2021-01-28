import {AlertService} from './../services/alert.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Post} from './../models/post';
import {PostService} from './../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {Comment} from '@/models/comment';
import {CommentsService} from "@/comments.service";
import {TagsService} from "@/services/tags.service";
import {AuthenticationService} from "@/services/authentication.service";
import {User} from "@/models/user";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  id: string | null;
  post: Post;
  loginForm: FormGroup | null = null;
  replyTo: number;
  user: any = {};
  commentBody: any;
  recentPosts: Post[] = [];
  recentFileNames: any = [];
  loading: boolean;
  fileExt: string;
  private tags: any = [];
  private currentUser: User | null;




  constructor(
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private postService: PostService,
    private alertService: AlertService,
    private tagsService: TagsService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.loading = true;
    if (this.id !== null)
      this.postService.getPost(this.id).subscribe(
        (response) => {
          this.post = response;
          console.log(this.post);
          this.fileExt = this.getFileExtension(this.post.media_url);
          this.postService.getRecent().subscribe(r =>{
            this.recentPosts = r;
            for (let i = 0; i < this.recentPosts.length; i++) {
              let ext = this.getFileExtension(this.recentPosts[i].media_url)
              this.recentFileNames.push(ext);
            }
            this.tagsService.getAll().subscribe(r =>{
              this.tags = r;
              this.loading = false;

            })
          })
        },
        (err) =>{ console.log(err); this.loading = false;}
      );

    this.loginForm = this.formBuilder.group({
      message: ['', Validators.required],

    });

    this.replyTo = -1;
  }

  get f() {
    return this.loginForm?.controls;
  }

  reply(commentId: number) {
    this.replyTo = commentId;
  }

  onSubmit() {
    // if (this.loginForm?.invalid) {
    //   return;
    // }

    // const comment = this.f?.message.value;
    const comment = this.commentBody;

    if (this.replyTo === -1) {

      this.postService.comment(this.post?.id, comment).subscribe(
        (data) => {
          this.post?.comments.push(data as Comment);
          // this.f?.message.setValue('');
          this.commentBody = '';
        },
        (error: any) => {
          this.alertService.error(error);
        }
      );
    } else {
      this.postService.subcomment(this.post?.id, this.replyTo, comment).subscribe(
        (data) => {
          console.log(data);
          // window.location.reload();
          for (let i = 0; i<this.post.comments.length; i++){
            if(this.post.comments[i].id == this.replyTo){
              this.post.comments[i].comments.push(data as Comment);
            }
          }

          this.f?.message.setValue('');
          this.replyTo = -1;

          this.commentBody = '';
        },
        (error: any) => {
          this.alertService.error(error);
        }
      );
    }
  }

  getFileExtension(filename: string) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  // addComment() {
  //   this.postService.comment(this.post.id,this.commentBody).subscribe(r =>{
  //     console.log(r);
  //   });
  // }
  deleteComment(id: number) {
    return this.postService.deleteComment(this.post.id,id).subscribe(r =>{
      this.removeComment(id);
    })
  }

  deleteSubComment(commentId: any, subCommentId: number){
    this.postService.deleteSubComment(this.post.id,commentId,subCommentId).subscribe(r =>{
      this.removeSubComment(commentId,subCommentId);
    })
  }

  private removeComment(id: number) {
    this.post.comments.forEach( (comment,index) =>{
      if(comment.id == id){
        this.post.comments.splice(index,1);
        return;
      }
    })
  }

  private removeSubComment(commentId: any, subCommentId: number) {
    this.post.comments.forEach( (comment,index) =>{
      if(comment.id == commentId){
        this.post.comments[index].comments.forEach((sub,i) =>{
          if(sub.id == subCommentId){
            this.post.comments[index].comments.splice(i,1);
          }
        })
        return;
      }
    })
  }
}
