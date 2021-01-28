import { User } from './user';
export class Comment {
  id: number;
  user: User;
  media: string;
  created_at: string;
  comments: Comment[];
  comment: string;
  post_id: number;
}
