import { Component, OnInit } from '@angular/core';
import {UserService} from "@/services/user.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "@/services/authentication.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  documents: any = [];


  constructor(private userService:UserService, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.userService.getUnApprovedDocuments().subscribe(r =>{
      this.documents = r;
      for (let i = 0 ; i< this.documents.length; i++){
        this.userService.getUserById(this.documents[i].user_id).subscribe(r=>{
          this.documents[i].user = r;
        });
      }
    })

  }

  accept(id: any) {
    this.userService.acceptDocument(id).subscribe(r=>{
      window.location.reload();
    })
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }

  delete(id: any) {
   this.userService.deleteUserDocuments(id).subscribe(r =>{
     window.location.reload();
   })
  }
}
