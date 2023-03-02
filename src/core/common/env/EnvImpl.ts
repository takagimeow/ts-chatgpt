import { Env } from "./Env";

export class EnvImpl implements Env {
  getApiKey(): string {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("No API key provided");
    }
    return process.env.OPENAI_API_KEY;
  }
}
