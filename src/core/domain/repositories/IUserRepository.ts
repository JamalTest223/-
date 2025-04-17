import { Favorite } from "../entities/Favorite";
import { User } from "../entities/User";

export interface IUserRepository {
  create: ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  delete: (id: string) => Promise<User | null>;
  checkExists: (email: string) => Promise<boolean>;
  updateResetToken: (
    id: string,
    resetToken: string,
    resetTokenExpiry: Date
  ) => Promise<User | null>;

  update: (id: string, user: Partial<User>) => Promise<User | null>;
  findByResetToken: (token: string) => Promise<User | null>;
}
