
export class CustomMessage {
  constructor(id: any, message: any, timestamp: any, userId: any) {
    this.id = id;
    this.message = message;
    this.timestamp = timestamp;
    this.user_id = userId;
  }

  id: string;
  message: string;
  timestamp: string;
  user_id: string;
}
