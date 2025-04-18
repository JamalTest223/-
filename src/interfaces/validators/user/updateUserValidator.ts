import { z } from "zod";

export const updateUserInputSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  role: z.enum(["ADMIN", "USER", "WRITER"]).optional(),
  city_id: z.string().optional(),
  date_of_birth: z.string().optional(),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
});
export type UpdateUserInputType = z.infer<typeof updateUserInputSchema>;
