// src/infrastructure/repositories/commentRepository.ts
import { PrismaClient } from "@prisma/client";
import { ICommentRepository } from "../../core/domain/repositories/ICommentRepository";
import prisma from "../database/prisma";

export const commentRepository: ICommentRepository = {
  create: async (commentData: any): Promise<any> => {
    try {
      const { user_id, blog_id, comment } = commentData;

      const newComment = await prisma.comment.create({
        data: {
          comment,
          user_id,
          blog_id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
      });

      return newComment;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  },

  getCommentsByBlogId: async (
    blogId: string,
    limit: number = 10,
    page: number = 1,
    search?: string
  ): Promise<any> => {
    try {
      // حساب التخطي للصفحات
      const skip = (page - 1) * limit;

      // إنشاء شروط البحث
      const whereCondition: any = {
        blog_id: blogId,
      };

      // إضافة شرط البحث إذا كان موجودًا
      if (search) {
        whereCondition.comment = {
          contains: search,
          mode: "insensitive", // للبحث بدون حساسية لحالة الأحرف
        };
      }

      // الحصول على إجمالي عدد التعليقات
      const totalCount = await prisma.comment.count({
        where: whereCondition,
      });

      // الحصول على التعليقات مع معلومات المستخدم
      const comments = await prisma.comment.findMany({
        where: whereCondition,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
        skip,
        take: limit,
      });

      return {
        data: comments,
        meta: {
          total: totalCount,
          page,
          limit,
          pages: Math.ceil(totalCount / limit),
        },
      };
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  },

  deleteComment: async (commentId: string): Promise<boolean> => {
    try {
      await prisma.comment.delete({
        where: { id: commentId },
      });
      return true;
    } catch (error) {
      console.error("Error deleting comment:", error);
      return false;
    }
  },

  updateComment: async (commentId: string, commentData: any): Promise<any> => {
    try {
      const updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: {
          comment: commentData.comment,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
      });
      return updatedComment;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  },
};
