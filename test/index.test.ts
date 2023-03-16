import { prompt } from "../build";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import type {
  ChatGPT,
  ChatGPTError,
} from "../build/core/data/repository/ChatGPTRepository";
import mockFetch, { MockResponse } from "../src/__mocks__/node-fetch";

jest.mock("node-fetch");

dotenv.config();

const mockData = {
  id: `chatcmpl-${faker.random.alphaNumeric}`,
  object: "chat.completion",
  created: Math.floor(Date.now() / 1000),
  model: "gpt-3.5-turbo-0301",
  usage: { prompt_tokens: 42, completion_tokens: 27, total_tokens: 69 },
  choices: [
    {
      message: {
        role: "assistant",
        content:
          "\n" +
          "\n" +
          "She loved ChatGPT, the one platform that sparked a passion within her. With it, she developed beautiful, inventive applications.",
      },
      finish_reason: "stop",
      index: 0,
    },
  ],
};

const mockErrorData = {
  error: {
    message: "That model does not exist",
    type: "invalid_request_error",
    param: null,
    code: null,
  },
};

describe("prompt", () => {
  afterEach(() => {
    mockFetch.mockReset();
  });
  test("should return a message object with the expected value", async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    } as MockResponse);
    const res: ChatGPT | ChatGPTError = await prompt({
      model: "gpt-3.5-turbo-0301",
      messages: [
        {
          role: "user",
          content:
            "In the style of Nicholas Sparks, please summarize the following introductory You are limited to 140 characters. 'I love ChatGPT and I develop applications using ChatGPT.'",
        },
      ],
    });
    const choices = (res as ChatGPT).choices ?? [];
    const message = choices.length > 0 ? choices[0].message : null;
    expect(choices?.length).toBe(1);
    expect(message).not.toBe(null);
    expect(message?.role).toBe("assistant");
    expect(message?.content).toBe(
      "\n\nShe loved ChatGPT, the one platform that sparked a passion within her. With it, she developed beautiful, inventive applications."
    );
  });
  test("should return a message object when ChatGPT returns Error", async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockErrorData),
    } as MockResponse);
    const res: ChatGPT | ChatGPTError = await prompt({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content:
            "In the style of Nicholas Sparks, please summarize the following introductory You are limited to 140 characters. 'I love ChatGPT and I develop applications using ChatGPT.'",
        },
      ],
    });
    const error = (res as ChatGPTError).error;
    const message = error.message ?? null;
    const type = error.type ?? null;
    const param = error.param;
    const code = error.code;
    expect(message).not.toBe(null);
    expect(message).toBe("That model does not exist");
    expect(type).not.toBe(null);
    expect(type).toBe("invalid_request_error");
    expect(param).toBe(null);
    expect(code).toBe(null);
  });
});
