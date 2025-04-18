import { CreateUserDto } from "@/src/core/dtos/user/CreateUserDto";
import { createUserUseCase } from "@/src/core/useCases/user/CreateUserUseCase";
import { createUserInputSchema } from "../../validators/user/createUserValidator";
import { InputParseError } from "@/src/core/domain/errors/commonErrors";

export const createUserController = async (data: CreateUserDto) => {
  const parsed = createUserInputSchema.safeParse(data);
  if (!parsed.success) {
    throw new InputParseError(
      "Invalid data",
      parsed.error.issues[0].message || "Invalid inputs"
    );
  }
  const user = await createUserUseCase(data);
  return user;
};
