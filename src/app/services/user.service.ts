import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { config } from '../config';
import {AuthenticationService} from "@/services/authentication.service";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient,
              private authService: AuthenticationService
              ) {}

  register(user: User) {
    return this.http.post(`${config.apiUrl}/api/auth/signup`, user, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  }

  checkApproved(){
    let fData = new FormData();
    fData.append('doc','123');

    return this.http.post(`${config.apiUrl}/api/documents/checkApproved`,fData);
  }

  uploadTherapistsDocuments(formData: FormData){
    return this.http.post(`${config.apiUrl}/api/document`, formData);
  }

  getUserById(id: any){
    return this.http.post<User>(`${config.apiUrl}/api/getUserById/`+id, id);
  }

  addReview(data: any) {
    return this.http.post(`${config.apiUrl}/api/review`, data )
  }

  getUnApprovedDocuments(){
    return this.http.get(`${config.apiUrl}/api/users/unApprovedDocuments`);
  }

  acceptDocument(id: any) {
    return this.http.post(`${config.apiUrl}/api/document/accept/`+id, id );
  }

  updatedData(formData: any, user: User | null) {
    console.log(formData);
    return this.http.put(`${config.apiUrl}/api/users/`+user?.id, formData);

  }

  updateUserProfile(formData: FormData, id: number) {
    return this.http.put(`${config.apiUrl}/api/users/`+id, formData);
  }

  deleteUserDocuments(id: any) {
    return this.http.delete(`${config.apiUrl}/api/document/`+id);

  }
}
