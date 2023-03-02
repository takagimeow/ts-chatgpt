import { container } from "tsyringe";
import { ChatGPTRepository } from "../repository/ChatGPTRepository.js";
import { ChatGPTRepositoryImpl } from "../repository/impl/ChatGPTRepositoryImpl.js";

export function dataModule() {
  container.register<ChatGPTRepository>("ChatGPTRepository", {
    useClass: ChatGPTRepositoryImpl,
  });
}
