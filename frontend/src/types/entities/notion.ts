import { Profile } from "./profile";

export interface Notion {
  id: number;
  profile: Profile;
  url: string;
  created_at: Date;
}
