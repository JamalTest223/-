import { User } from "@/src/core/domain/entities/User";
import { Role } from "@/src/core/domain/enums/Role";
import { User as PrismaUser } from "@prisma/client";
 
export function mapPrismaUserToUser(prismaUser: PrismaUser) {
  return new User(
    prismaUser.id,
    prismaUser.name,
    prismaUser.email,
    (prismaUser.role as Role) || Role.USER,
    prismaUser.password,
    prismaUser.resetToken || undefined,
    prismaUser.resetTokenExpiry || undefined,
    prismaUser.imageUrl || undefined,
    prismaUser.bio || undefined,
    prismaUser.city_id || undefined,
    prismaUser.created_at,
    prismaUser.updated_at
  );
}
