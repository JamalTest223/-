import { UserPayload } from "@/src/core/domain/services/jwtServiceInterface";
import {
  loginInputSchema,
  LoginInputType,
} from "../../validators/auth/loginValidator";
import { loginUserUseCase } from "@/src/core/useCases/auth/LoginUserUseCase";
import { InputParseError } from "@/src/core/domain/errors/commonErrors";

export const loginController = async (
  input: LoginInputType
): Promise<{ user: UserPayload; token: string }> => {
  const parsed = loginInputSchema.safeParse(input);

  if (!parsed.success) {
    throw new InputParseError("Invalid data", { cause: parsed.error });
  }
  const user = await loginUserUseCase(input.email, input.password);

  return { user: user.user.toPayload(), token: user.token };
};
