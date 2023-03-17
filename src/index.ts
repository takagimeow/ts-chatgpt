import "reflect-metadata";
import { container } from "tsyringe";
import dotenv from "dotenv";
import { envModule } from "./core/common/env/di/envModule";
import { dataModule } from "./core/data/di/dataModule";
import {
  ChatGPTRepository,
  GPTModel,
  Message,
  PromptOptions,
} from "./core/data/repository/ChatGPTRepository";
import { networkModule } from "./core/network/di/networkModule";

dotenv.config();

envModule();
networkModule();
dataModule();

export async function prompt({
  model = "gpt-3.5-turbo-0301",
  messages = [],
  options = {},
}: {
  model: GPTModel;
  messages: Message[];
  options?: PromptOptions;
}) {
  const repository = container.resolve<ChatGPTRepository>("ChatGPTRepository");
  const response = await repository.prompt(model, messages, options);
  return response;
}
