import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AuthenticationService} from "@/services/authentication.service";
import {User} from "@/models/user";
import {error} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  currentUser: User | null = null;

  constructor(
    private afs: AngularFirestore,
    private authenticationService: AuthenticationService,

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  public send(message: any, id: any) {
    if (this.currentUser) {
      const data = {
        user_id: this.currentUser.id,
        message: message,
        timestamp: new Date(),
      };
      const nullData = {
        time: new Date(),
        updated: new Date()
      };

      const userDoc = this.afs.collection('users').doc(id + '');
      userDoc.set({ nullData });
      const chatter = userDoc.collection("chats").doc(`${this.currentUser.id}`);
      chatter.set({ nullData })
      chatter.collection("messages").doc().set({
        user_id: this.currentUser.id,
        message: message,
        timestamp: new Date(),
      });

      const ref = this.afs.collection('users').doc<any>(`${this.currentUser.id}`)
      ref.set({ nullData });
      const chatterUser = ref.collection("chats").doc(id+"");
      chatterUser.set({ nullData })
      return  chatterUser.collection("messages").doc().set({
        user_id: this.currentUser?.id,
        message: message,
        timestamp: new Date(),
      });
    }else{
      return null;
    }


  }
}
