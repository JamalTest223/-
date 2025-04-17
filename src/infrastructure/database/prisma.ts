// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// إنشاء متغير عام للحفاظ على نسخة واحدة من PrismaClient
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// إنشاء نسخة واحدة من PrismaClient ومشاركتها بين جميع الطلبات
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
