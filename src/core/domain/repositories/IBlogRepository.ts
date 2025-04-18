import { Blog } from "../entities/Blog";

export interface IBlogRepository {
  getBlogs: (
    limit: number,
    page: number,
    search?: string,
    categoryId?: string
  ) => Promise<Blog | null>;
  getBlog: (id: string) => Promise<Blog | null>;
  delete(id: string): Promise<boolean | null>;
  create(blog: Partial<Blog>): Promise<Blog | null>;
  update(blog: Partial<Blog>, blogId: string): Promise<Blog | null>;
}
