import { Podcast } from "../entities/Podcast";

export interface IPodcastRepository {
  getPodcasts(
    limit: number,
    page: number,
    search?: string,
    categoryId?: string
  ): Promise<Podcast | null>;
  delete(id: string): Promise<boolean>;
  create(podcast: Partial<Podcast>): Promise<Podcast | null>;
  update(
    podcast: Partial<Podcast>,
    podcastId: string
  ): Promise<Podcast | null>;
  getPodcast(id: string): Promise<Podcast | null>;
  updateViewsCount(id: string): Promise<boolean>;
  getMostViewed(limit: number,page: number): Promise<Podcast[] | null>;
}
