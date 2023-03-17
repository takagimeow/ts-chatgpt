import { z } from "zod";
export interface ChatGPTRepository {
  prompt(
    model: GPTModel,
    messages: Message[],
    options: PromptOptions
  ): Promise<ChatGPT | ChatGPTError>;
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
export const ChatGPTError = z.object({
  error: z.object({
    message: z.string(),
    type: z.string(),
    param: z.nullable(z.string()),
    code: z.nullable(z.string()),
  }),
});

export type ChatGPT = z.infer<typeof ChatGPT>;
export type ChatGPTError = z.infer<typeof ChatGPTError>;
export type GPTModel = "gpt-3.5-turbo-0301" | "gpt-3.5-turbo" | "gpt-4";
export type Role = "system" | "assistant" | "user";
export interface Message {
  role: Role;
  content: string;
}
export interface PromptOptions {
  temperature?: number;
}
