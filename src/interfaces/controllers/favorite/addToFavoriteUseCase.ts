import { addToFavoriteUseCase } from "@/src/core/useCases/favorite/addToFavoriteUseCase";

export const addToFavoriteController = async (
  userId: string,
  podcastId: string
) => {
  const favorite = await addToFavoriteUseCase(podcastId, userId);
  return favorite;
};
