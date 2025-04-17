import { UnauthenticatedError } from "@/src/core/domain/errors/AuthErrors";
import {
  AuthenticatedRequest,
  JWTVerifyResult,
} from "@/src/core/domain/services/jwtServiceInterface";
import { ApiHandler } from "@/src/core/domain/types/authenticatedRequest";
import { authRepository } from "@/src/infrastructure/repositories/authRepository";
import { verifyJWT } from "@/src/infrastructure/services/jwtService";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export function requireAuth(handler: ApiHandler): ApiHandler {
  return async (req: AuthenticatedRequest, res: NextResponse) => {
    // Get token from the Authorization header
    const authHeader = req.headers.get("Authorization");

    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthenticatedError("User Not Authenticated");
    }

    const token = authHeader.split(" ")[1];
    const { valid, expired, decoded } = authRepository.verifyAuthToken(
      token
    ) as JWTVerifyResult;

    if (!valid || !decoded) {
      throw new UnauthenticatedError(
        valid ? "Token Expired" : "User Not Authenticated"
      );
    }

    // Add user info to request
    req.user = decoded;

    // Call the original handler
    return await handler(req, res);
  };
}
