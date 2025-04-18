import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { addToFavoriteController } from "@/src/interfaces/controllers/favorite/addToFavoriteUseCase";
import { requireAuth } from "@/src/interfaces/middlewares/authMiddleware";
import { NextResponse } from "next/server";

export const POST = requireAuth(
  async (req: AuthenticatedRequest,  ) => {
    try {
      const { userId, podcastId } = await req.json();
      const controller = await addToFavoriteController(userId, podcastId);

      return NextResponse.json(
        { success: true, data: controller },
        { status: 201 }
      );
    } catch (e: any) {
      return NextResponse.json(
        { message: e.message, success: false },
        { status: e.statusCode || 500 }
      );
    }
  }
);
