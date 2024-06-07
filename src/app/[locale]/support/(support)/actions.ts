"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { postSupport } from "@/utils/api/supportApi";
import { fromErrorToFormState, toFormState } from "./utils";

const createMessageSchema = z.object({
  subject: z.string().min(1),
  message: z.string().min(1),
});

export const createMessage = async (
  formState: { message: string },
  formData: FormData
) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  try {
    const data = createMessageSchema.parse({
      subject: formData.get("subject"),
      message: formData.get("message"),
    });

    postSupport({ ...data });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath("/support");

  return toFormState("SUCCESS", "Message created");
};
