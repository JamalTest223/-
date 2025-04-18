import {
  AuthenticatedRequest,
  JWTVerifyResult,
} from "@/src/core/domain/services/jwtServiceInterface";
import { ApiHandler } from "@/src/core/domain/types/authenticatedRequest";
import { authRepository } from "@/src/infrastructure/repositories/authRepository";
import { NextResponse } from "next/server";

export function requireAuth(handler: ApiHandler): ApiHandler {
  return async (req: AuthenticatedRequest, res: NextResponse) => {
    try {
      const authHeader = req.headers.get("Authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
          { success: false, message: "User Not Authenticated" },
          { status: 401 }
        );
      }

      const token = authHeader.split(" ")[1];
      const { valid, expired, decoded } = authRepository.verifyAuthToken(
        token
      ) as JWTVerifyResult;

      if (!valid || !decoded) {
        return NextResponse.json(
          {
            success: false,
            message: expired ? "Token Expired" : "Invalid Token",
          },
          { status: 401 }
        );
      }

      // Attach user to request
      req.user = decoded;

      // Call the original handler
      return await handler(req, res);
    } catch (e: any) {
      return NextResponse.json(
        { success: false, message: "Authentication Error" },
        { status: 500 }
      );
    }
  };
}
