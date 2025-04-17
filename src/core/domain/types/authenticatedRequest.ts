import { NextApiResponse } from "next";
import { AuthenticatedRequest } from "../services/jwtServiceInterface";
import { NextResponse } from "next/server";
import { User } from "../entities/User";

export type ApiHandler = (
  req: AuthenticatedRequest,
  res: NextResponse
) => Promise<NextResponse | User>;
