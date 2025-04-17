import { hashPassword } from "@/src/infrastructure/services/passwordService";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AlreadyExistsError } from "../../domain/errors/AuthErrors";
import { User } from "../../domain/entities/User";
import { BaseError } from "../../domain/errors/commonErrors";
import { userRepository } from "@/src/infrastructure/repositories/userRepository";
import { authRepository } from "@/src/infrastructure/repositories/authRepository";

export const registerUserUseCase = async (
  name: string,
  email: string,
  password: string
): Promise<{ token: string; user: User }> => {
  try {
    if (await userRepository.checkExists(email)) {
      throw new AlreadyExistsError("Email Already Exists");
    }
    const data = { email, password, name };
    const hashedPassword = await hashPassword(password);

    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const token = await authRepository.generateAuthToken(user!!.toPayload());

    return { user: user!!, token };
  } catch (e: any) {
    console.log(e);
    throw new BaseError(e.name, e.message, 400);
  }
};
