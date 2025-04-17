import { Podcast } from "./Podcast";
import { User } from "./User";

export class Review {
  constructor(
    public id: string,
    public reviewText: string,
    public created_at: string,
    public user_id: string,
    public podcast_id: string
  ) {}
}
