import {
  NotFoundUser,
  UnauthorizedError,
} from "@/src/core/domain/errors/AuthErrors";
import {
  BaseError,
  InputParseError,
  UnexpectedError,
} from "@/src/core/domain/errors/commonErrors";
import { updateUserUseCase } from "@/src/core/useCases/user/UpdateUserUseCase";
import { updateUserInputSchema } from "../../validators/user/updateUserValidator";
import { userRepository } from "@/src/infrastructure/repositories/userRepository";
import { UserPayload } from "@/src/core/domain/services/jwtServiceInterface";
import { UpdateUserDto } from "@/src/core/dtos/user/UpdateUserDto";
import { EmailExistsError } from "@/src/core/domain/errors/EmailErrors";

export const updateUserController = async (
  id: string,
  data: UpdateUserDto,
  user: UserPayload
) => {
  // 🧪 التحقق من صحة البيانات
  const parsed = updateUserInputSchema.safeParse(data);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message || "Invalid input";
    throw new InputParseError("Invalid data", message);
  }

  // 🛡️ التحقق من الصلاحيات
  if (!id) throw new NotFoundUser();
  if (user.id !== id && user.role !== "ADMIN") throw new UnauthorizedError();

  // 📧 التحقق من البريد الإلكتروني إذا تم تغييره
  

  // 🔄 تنفيذ العملية
  const updatedUser = await updateUserUseCase(id, data);
  if (!updatedUser) throw new UnexpectedError();

  return updatedUser;
};
