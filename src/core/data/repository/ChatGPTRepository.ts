import { z } from "zod";
export interface ChatGPTRepository {
  prompt(model: GPTModel, messages: Message[]): Promise<ChatGPT>;
}

export const ChatGPT = z.object({
  id: z.string(),
  object: z.string(),
  created: z.number(),
  model: z.string(),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
  }),
  choices: z.optional(
    z.array(
      z.object({
        message: z.object({
          role: z.string(),
          content: z.string(),
        }),
        finish_reason: z.string(),
        index: z.number(),
      })
    )
  ),
});

export type ChatGPT = z.infer<typeof ChatGPT>;
export type GPTModel = "gpt-3.5-turbo-0301" | "gpt-3.5-turbo";
export type Role = "system" | "assistant" | "user";
export interface Message {
  role: Role;
  content: string;
}
