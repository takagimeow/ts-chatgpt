import type { RequestInit } from "node-fetch";

type Callback<T> = (data: unknown) => T;
export interface FetchService {
  sendRequest<T>(
    url: string,
    options: RequestInit,
    parser: Callback<T>
  ): Promise<ReturnType<typeof parser>>;
}
