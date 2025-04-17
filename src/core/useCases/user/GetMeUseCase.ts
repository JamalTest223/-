import { userRepository } from "@/src/infrastructure/repositories/userRepository";
import {
  NotFoundUser,
  UnauthenticatedError,
} from "../../domain/errors/AuthErrors";
import { BaseError } from "../../domain/errors/commonErrors";
import { authRepository } from "@/src/infrastructure/repositories/authRepository";
import { User } from "../../domain/entities/User";

export const getMeUseCase = async (id: string): Promise<User> => {
  try {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new NotFoundUser();
    }
    return user;
  } catch (e: any) {
    console.log(e);
    throw new BaseError(e.name, e.message, 400);
  }
};
