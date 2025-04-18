export interface ICommentRepository {
  create(comment: any): Promise<any>;
  getCommentsByBlogId(
    blogId: string,
    limit?: number,
    page?: number,
    search?: string
  ): Promise<any>;
  deleteComment(commentId: string): Promise<boolean>;
  updateComment(commentId: string, comment: any): Promise<any>;
}
