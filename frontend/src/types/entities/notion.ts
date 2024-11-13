import { Profile } from "./profile";

export interface Notion {
  id: number;
  profile: Profile;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  created_at: Date;
}
