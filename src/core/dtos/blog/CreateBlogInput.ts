export interface CreateBlogInput {
  title: string;
  content: string;
  slug: string;
  categoryId: string;
  imageId?: number;
  userId: string;
}
