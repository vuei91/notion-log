import { GoogleUser } from "./googleUser";

export interface Notion {
  id: number;
  user: GoogleUser;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}
