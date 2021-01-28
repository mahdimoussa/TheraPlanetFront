import { Comment } from './comment';
import { User } from './user';
export class Post {
  id: number;
  user: User;
  media: string;
  caption: string;
  created_at: string;
  liked: boolean;
  likes_count: number;
  comments_count: number;
  comments: Comment[];
  saved: boolean;
  media_url: string;
}
