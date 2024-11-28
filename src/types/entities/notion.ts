import { ExtendedRecordMap } from "notion-types";
import { Likes } from "./likes";
import { Profile } from "./profile";
import { Views } from "./views";

export interface Notion {
  id: number;
  profile: Profile;
  views: Views[];
  likes: Likes[];
  url: string;
  page: ExtendedRecordMap & { isNotFound: boolean };
  created_at: Date;
}
