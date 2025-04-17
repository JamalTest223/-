import { IUserRepository } from "@/src/core/domain/repositories/IUserRepository";
import bcrypt from "bcryptjs";
import { userAgent } from "next/server";
import prisma from "../database/prisma";
import { mapPrismaUserToUser } from "../mappers/userMapper";
export const userRepository: IUserRepository = {
  create: async (userData) => {
    try {
      const user = await prisma.user.create({ data: userData });

      return user ? mapPrismaUserToUser(user) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  findById: async (id) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });

      return user ? mapPrismaUserToUser(user) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  updateResetToken: async (id, resetToken, resetTokenExpiry) => {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: {
          resetToken,
          resetTokenExpiry,
        },
      });

      return user ? mapPrismaUserToUser(user) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  findByEmail: async (email) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });

      return user ? mapPrismaUserToUser(user) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  checkExists: async (email: string) => {
    try {
      const userCount = await prisma.user.count({ where: { email } });
      return userCount > 0;
    } catch (e: any) {
      console.error(`Error in userRepository.checkExists: ${e.message}`);
      return false;
    }
  },
  delete: async (id) => {
    try {
      const user = await prisma.user.delete({ where: { id } });
      return mapPrismaUserToUser(user);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  update: async (id, data) => {
    try {
      const prismaUser = await prisma.user.update({
        where: { id },
        data: { ...data },
      });

      return mapPrismaUserToUser(prismaUser);
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  findByResetToken: async (token) => {
    try {
      const user = await prisma.user.findFirst({
        where: { resetToken: token },
      });
      return user ? mapPrismaUserToUser(user) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};
