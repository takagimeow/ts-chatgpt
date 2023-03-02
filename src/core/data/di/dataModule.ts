import { container } from "tsyringe";
import { ChatGPTRepository } from "../repository/ChatGPTRepository";
import { ChatGPTRepositoryImpl } from "../repository/impl/ChatGPTRepositoryImpl";

export function dataModule() {
  container.register<ChatGPTRepository>("ChatGPTRepository", {
    useClass: ChatGPTRepositoryImpl,
  });
}
