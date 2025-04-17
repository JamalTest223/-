import { Category } from "@prisma/client";
import { Review } from "./Review";
import { Favorite } from "./Favorite";

export class Podcast {
  constructor(
    public id: string,
    public title: string,
    public description?: string,
    public views_count?: number,
    public cover_image?: string,
    public audio_url?: string,
    public isFeatured?: boolean,
    public created_at?: Date,
    public videoUrl?: string,
    public category_id?: string,
    public category?: Category,
    public guestName?: string
  ) {}
}
