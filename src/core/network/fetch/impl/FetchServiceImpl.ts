import fetch, { RequestInit } from "node-fetch";
import { FetchService } from "../FetchService";

export class FetchServiceImpl implements FetchService {
  async sendRequest<T>(
    url: string,
    options: RequestInit,
    parser: (data: unknown) => T
  ): Promise<T> {
    const response = await fetch(url, options);
    const json = await response.json();
    const data = parser(json);
    return data;
  }
}
