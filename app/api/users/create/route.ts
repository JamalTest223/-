import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { CreateUserDto } from "@/src/core/dtos/user/CreateUserDto";
import { createUserController } from "@/src/interfaces/controllers/user/createUserController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { requireAuth } from "@/src/interfaces/middlewares/authMiddleware";
import { NextResponse } from "next/server";

export const POST = requireAdminAuth(
  async (req: AuthenticatedRequest,  ) => {
    try {
      const body = (await req.json()) as CreateUserDto;

      const userInformation = await createUserController(body);

      return NextResponse.json({
        success: true,
        user: userInformation,
        message: "User created successfully",
      });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.statusCode | 500 }
      );
    }
  }
);
