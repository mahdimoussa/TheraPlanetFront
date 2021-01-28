import { Injectable } from '@angular/core';
import {config} from "@/config";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${config.apiUrl}/api/tags`);
  }
}
