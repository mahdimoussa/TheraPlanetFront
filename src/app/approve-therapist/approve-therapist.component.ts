import { Component, OnInit } from '@angular/core';
import {UserService} from "@/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-approve-therapist',
  templateUrl: './approve-therapist.component.html',
  styleUrls: ['./approve-therapist.component.css']
})
export class ApproveTherapistComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  licencePhotoFile: File | null = null;
  idPhotoFile: File | null = null;
  type: string = 'General';
  document:any = {};

  ngOnInit(): void {
    this.userService.checkApproved().subscribe( r => {
      let response: any = [];
      response = r;
      this.document = response[0];
      console.log(this.document)

    })
  }

  handleLicenceInput(files: FileList) {
    this.licencePhotoFile = files.item(0);
  }

  handleIdInput(files: FileList) {
    this.idPhotoFile = files.item(0);
  }

  upload() {
    let formData = new FormData();

    if (this.licencePhotoFile !== null) {
      formData.append('license_photo', this.licencePhotoFile, this.licencePhotoFile.name);
    }else{
      return;
    }
    if (this.idPhotoFile !== null) {
      formData.append('id_photo', this.idPhotoFile, this.idPhotoFile.name);
    }else return;

    formData.append('type',this.type);

    this.userService.uploadTherapistsDocuments(formData).subscribe(
      (response) => {
        console.log(response);
        this.document = {
          id:-1,
        };

        // this.router.navigateByUrl('/');
      }
    );
  }

}
