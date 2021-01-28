import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Post} from '../models/post';
import {config} from '../config';
import {Observable, Observer} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(`${config.apiUrl}/api/post`);
  }

  getRecent() {
    return this.http.get<Post[]>(`${config.apiUrl}/api/post/getRecent`);
  }

  getPost(post_id: string) {
    return this.http.get<Post>(`${config.apiUrl}/api/post/${post_id}`);
  }

  createPost(formData: FormData) {
    return this.http.post(`${config.apiUrl}/api/post`, formData);
  }

  like(post_id: number) {
    return this.http.post(
      `${config.apiUrl}/api/like`,
      {post_id},
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      }
    );
  }

  comment(post_id: number | undefined, comment: string) {
    return this.http.post(
      `${config.apiUrl}/api/posts/${post_id}/comment`,
      {comment},
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      }
    );
  }

  subcomment(post_id: number | undefined, comment_id: number, subcomment: string) {
    return this.http.post(
      `${config.apiUrl}/api/posts/${post_id}/comments/${comment_id}/subcomments`,
      {subcomment},
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      }
    );
  }

  save(post_id: number) {
    return this.http.post(`${config.apiUrl}/api/saved`, {post_id})
  }


  getSaved() {
    return this.http.get(`${config.apiUrl}/api/saved`);
  }

  getPostsByTherapistId(id: any) {
    return this.http.get(`${config.apiUrl}/api/post/therapist/${id}`);
  }

  delete(id: any) {
    return this.http.delete(`${config.apiUrl}/api/post/${id}`)
  }

  getPagination(pageNumber: number) {
    return this.http.get(`${config.apiUrl}/api/post?page=${pageNumber}`,);
  }

  search(searchText: any) {
    return this.http.get(`${config.apiUrl}/api/post/search/${searchText}`);
  }

  getPostsByTagId(id: any) {
    return this.http.get(`${config.apiUrl}/api/post/getByTagId/${id}`);
  }

  editPost(formData: FormData, id: any) {
    return this.http.put(`${config.apiUrl}/api/post/` + id, formData);

  }

  deleteComment(postId: number, id: number) {
    return this.http.delete(  `${config.apiUrl}/api/posts/${postId}/comment/`+id);
  }

  deleteSubComment(id: number, commentId: any, subCommentId: number) {
    return this.http.delete(  `${config.apiUrl}/api/posts/${id}/comments/`+commentId+"/subcomments/"+subCommentId);
  }
}
