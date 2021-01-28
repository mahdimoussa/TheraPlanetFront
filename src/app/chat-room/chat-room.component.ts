import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "@/services/chat.service";
import {User} from "@/models/user";
import {AuthenticationService} from "@/services/authentication.service";

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  @Input()
  user: any;

  messages: any = [];
  message: any;
  private currentUser: User | null;

  constructor(
    private  chatService: ChatService,
    private authService: AuthenticationService
  ) {
    this.currentUser = this.authService.currentUserValue;

  }

  ngOnInit(): void {
    this.messages = this.user.messages;

  }

  ngOnChanges() {
    // create header using child_id
    this.messages = this.user.messages;
  }

  sendMessage() {
    this.chatService.send(this.message, this.user.id)?.then(r => {
        this.message = '';
        this.ngOnInit();
      }
    )
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  myMessages(id: any) {
    if (this.currentUser?.id == id) return true;
    else  return false;
  }

  handleOnKeyUp(event) {
    if(event.keyCode === 13) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
