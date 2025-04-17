import { getMeUseCase } from "@/src/core/useCases/user/GetMeUseCase";
import { requireAuth } from "../../middlewares/authMiddleware";
import { NextResponse } from "next/server";
import { UnauthenticatedError } from "@/src/core/domain/errors/AuthErrors";

export const getMeController = requireAuth(async (req, res) => {
  console.log(req.user, "asdfghjmk");
  if (!req.user) throw new UnauthenticatedError();
  const user = await getMeUseCase(req.user.id);
  return user;
});
