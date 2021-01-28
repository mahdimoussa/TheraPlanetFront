import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {config} from "@/config";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private http:HttpClient,
  ) { }

  addComment(formData: any, post:any) {
    return this.http.post(`${config.apiUrl}/api/posts/`+post+`/comment `, formData);
  }
}
