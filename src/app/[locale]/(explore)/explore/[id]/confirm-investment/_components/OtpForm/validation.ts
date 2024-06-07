import { z } from "zod"; // Add new import

export const UserSchema = z.object({
  otp: z.string({ required_error: "OTP is invalid. Try again." }).min(6).max(6),
});
