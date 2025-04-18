import {
  AuthenticatedRequest,
  JWTVerifyResult,
} from "@/src/core/domain/services/jwtServiceInterface";
import { ApiHandler } from "@/src/core/domain/types/authenticatedRequest";
import { authRepository } from "@/src/infrastructure/repositories/authRepository";
import { userRepository } from "@/src/infrastructure/repositories/userRepository";
import { NextResponse } from "next/server";

export function requireAdminAuth(handler: ApiHandler): ApiHandler {
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

      const user = await userRepository.findByEmail(decoded.email);
      if (!user || user.role !== "ADMIN") {
        return NextResponse.json(
          { success: false, message: "Access Denied: Not Admin" },
          { status: 403 }
        );
      }

      // Attach user to request
      req.user = decoded;

      return await handler(req, res);
    } catch (e: any) {
      console.log("Error in adminAuthMiddleware:", e);
      return NextResponse.json(
        { success: false, message: "Authentication Error" },
        { status: 500 }
      );
    }
  };
}
