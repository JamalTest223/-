import { favoriteRepository } from "@/src/infrastructure/repositories/favoriteRepository";
import {
  AlreadyExistsError,
  NotFoundUser,
} from "../../domain/errors/AuthErrors";

export const addToFavoriteUseCase = async (
  podcastId: string,
  userId: string
) => {
  const existingUser = await favoriteRepository.findByUserIdAndPodcastId(
    userId,
    podcastId
  );
  if (!existingUser) {
    return new NotFoundUser();
  }
  const existingFavorite = await favoriteRepository.findByUserIdAndPodcastId(
    userId,
    podcastId
  );
  if (existingFavorite) {
    return new AlreadyExistsError("Favorite already exists");
  }
  const favorite = await favoriteRepository.create(userId, podcastId);
  return favorite;
};
