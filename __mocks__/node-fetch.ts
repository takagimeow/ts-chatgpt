/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestInfo, RequestInit, Response } from "node-fetch";

const mockFetch = jest.fn(
  (url: RequestInfo, init?: RequestInit): Promise<Response> => {
    throw new Error("Fetch mock not implemented");
  }
);

export default mockFetch;
export type MockResponse = any;
