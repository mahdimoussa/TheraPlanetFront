import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AuthenticationService} from "@/services/authentication.service";
import * as firebase from 'firebase/app';
import {User} from "@/models/user";
import {ChatService} from "@/services/chat.service";
import {first, map, timestamp} from "rxjs/operators";
import {CustomMessage} from "@/models/custom-message";
import {UserService} from "@/services/user.service";
import { createFileLevelUniqueName } from 'typescript';
import {Router} from '@angular/router';

export const snapshotToArray = (snapshot: any) => {
  let returnArr: any = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  load = false;
  receiver_id:any;
  user_id : number ;
  message='';
  currentUser: User | null = null;
  chats_ids: any = [];
  chats : any = [];
  messages: any = [];
  rooms: any = [];
  private users: any = [];
  private responses: any = [];

  loading: boolean = true;
  private selectedIndex: any = 1;

  constructor(
    private afs: AngularFirestore,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private  chatService: ChatService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // FirebaseFirestore.getInstance().collection(COLLECTION_KEY).document(DOCUMENT_KEY)
  }

  ngOnInit(): void {

    // firebase.default.database().ref('/users/').on('value', resp => {
    //   this.rooms = [];
    //   this.rooms = snapshotToArray(resp);
    //   console.log(this.rooms);
    // });
    if (this.currentUser) {
      this.loading = true;
      const ref = this.afs.collection('users').doc<any>(`${this.currentUser.id}`).collection("chats");
      ref.snapshotChanges().pipe(
        map((snaps) =>
          snaps.map((snap) => {
            console.log("snap");
            console.log(snap.payload.doc.id);
            return snap.payload.doc.id
          }),
        ),
        first(),
      ).subscribe(chats_ids => {
        console.log("chats:", chats_ids);
        this.chats_ids = chats_ids;
        chats_ids.forEach(id => {
          this.userService.getUserById(id).subscribe(user => {
            let chatter: any ={};
            chatter = user;
            this.users.push(chatter);
            ref.doc(id).collection("messages").snapshotChanges().pipe(map((snaps) =>
              snaps.map((snap) => {
                // console.log(snap.payload.doc.id);
                // console.log(snap.payload.doc.data());

                return new CustomMessage(
                  snap.payload.doc.id,
                  snap.payload.doc.data()['message'],
                  snap.payload.doc.data()['timestamp'],
                  snap.payload.doc.data()['user_id']
                );
              })
            )).subscribe(response => {
              let array:any [];
              array = response;
              array.sort((a,b) => a.timestamp - b.timestamp);
              chatter.messages = array;
              console.log(this.users)
              this.loading = false;
            })
          })
        })
      });
    }
  }

  openchat(index: any){
      this.selectedIndex =index;
  }
  chatSelected(index: any) {
    this.selectedIndex = index;
  }


sendMessage() {
  this.chatService.send(this.message, this.receiver_id)?.then(r => {
    this.router.navigateByUrl('/messages');
      this.message = '';

    }
  )
}
}
