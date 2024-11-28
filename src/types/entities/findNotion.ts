import { Likes } from "./likes";
import { Profile } from "./profile";
import { Views } from "./views";

export interface FindNotion {
  id: number;
  profile: Profile;
  views: Views[];
  likes: Likes[];
  url: string;
  created_at: Date;
  title: string;
  description: string;
}
