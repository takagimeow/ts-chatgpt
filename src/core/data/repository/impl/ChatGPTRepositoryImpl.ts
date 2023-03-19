import { container } from "tsyringe";
import { Env } from "../../../common/env/Env";
import { V1_CHAT_COMPLETIONS_URL } from "../../../common/utils/constants";
import { FetchService } from "../../../network/fetch/FetchService";
import {
  ChatGPT,
  ChatGPTError,
  ChatGPTRepository,
  Message,
  PromptOptions,
} from "../ChatGPTRepository";

export class ChatGPTRepositoryImpl implements ChatGPTRepository {
  protected fetchService: FetchService;
  protected env: Env;
  protected url: string;
  protected apiKey: string;
  constructor() {
    this.fetchService = container.resolve<FetchService>("FetchService");
    this.env = container.resolve<Env>("Env");
    this.url = V1_CHAT_COMPLETIONS_URL;
    this.apiKey = this.env.getApiKey();
  }

  async prompt(model: string, messages: Message[], options: PromptOptions) {
    // Extract only apiKey from options
    const { apiKey, ...restOptions } = options;
    const headers = this.prepareAuthHeaders(apiKey ?? this.apiKey);
    const response = await this.fetchService.sendRequest(
      this.url,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          model,
          messages,
          ...restOptions,
        }),
      },
      this.parser
    );
    return response;
  }

  private prepareAuthHeaders(apiKey: string) {
    return {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };
  }

  private parser(json: unknown) {
    if (json instanceof Object && "error" in json) {
      return ChatGPTError.parse(json);
    }
    const data = ChatGPT.parse(json);
    return data;
  }
}
