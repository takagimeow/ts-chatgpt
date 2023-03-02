import "reflect-metadata";
import { container } from "tsyringe";
import { envModule } from "./core/common/env/di/envModule";
import { dataModule } from "./core/data/di/dataModule";
import {
  ChatGPTRepository,
  GPTModel,
  Message,
} from "./core/data/repository/ChatGPTRepository";
import { networkModule } from "./core/network/di/networkModule";

envModule();
networkModule();
dataModule();

export async function prompt({
  model = "gpt-3.5-turbo-0301",
  messages = [],
}: {
  model: GPTModel;
  messages: Message[];
}) {
  const repository = container.resolve<ChatGPTRepository>("ChatGPTRepository");
  const response = await repository.prompt(model, messages);
  return response;
}
