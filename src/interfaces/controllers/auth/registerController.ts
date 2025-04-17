import { InputParseError } from "@/src/core/domain/errors/commonErrors";
import { UserPayload } from "@/src/core/domain/services/jwtServiceInterface";
import { registerUserUseCase } from "@/src/core/useCases/auth/RegisterUserUseCase";
import { z } from "zod";
import {
  registerInputSchema,
  RegisterInputType,
} from "../../validators/auth/registerValidator";
 
export const registerController = async (
  input: RegisterInputType
): Promise<{ user: UserPayload; token: string }> => {
  const parsed = registerInputSchema.safeParse(input);
  if (!parsed.success)
    throw new InputParseError("Invalid data", { cause: parsed.error });

  const user = await registerUserUseCase(
    input.name,
    input.email,
    input.password
  );

  return { user: user.user.toPayload(), token: user.token };
};
