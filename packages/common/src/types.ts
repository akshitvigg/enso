import { z } from "zod";

export const CreateSignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  name: z.string().min(3),
});

export const CreateSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export const CreateRoomSchema = z.object({
  slug: z.string().min(3),
});
