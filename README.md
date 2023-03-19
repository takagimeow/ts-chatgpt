# ts-chatgpt

[![npm version](https://badge.fury.io/js/ts-chatgpt.svg)](https://badge.fury.io/js/ts-chatgpt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A library that is created to receive pure responses that are typed using the official [ChatGPT API](https://platform.openai.com/docs/guides/chat) by [OpenAI](https://openai.com/).

## Install

```shell
npm install ts-chatgpt
```

It has been confirmed to work with [Remix](https://github.com/remix-run/remix)'s loader function.

## Usage

| Function | Description                     | Parameters                                                                                                                      | Return                     |
| -------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `prompt` | Get a response from ChatGPT API | `props` - The props contains an model name you want to use for the ChatGPT API, an array of Message type and an options object. | `Promise<ChatGPTResponse>` |

When calling this function, be sure to set the `OPENAI_API_KEY` environment variable to the API key you received from OpenAI.

```ts
import { prompt } from "ts-chatgpt";

const response = await prompt({
  model: "gpt-4",
  messages: [
    {
      role: "user",
      content:
        "In the style of Nicholas Sparks, please summarize the following introductory You are limited to 140 characters. 'I love Android and I develop applications using Kotlin and Jetpack Compose.'",
    },
  ],
  options: {
    temperature: 0.1,
  },
});
```

Since `dotenv.config()` is automatically called internally, developers do not need to install dotenv to load OPENAI_API_KEY themselves.

## Props

When calling `prompt()`, you must pass an object containing the following as an argument:

| Key        | Description                                         | Type            | Required |
| ---------- | --------------------------------------------------- | --------------- | -------- |
| `model`    | The model name you want to use for the ChatGPT API. | `string`        | ✅       |
| `messages` | An array of Message type.                           | `Message[]`     | ✅       |
| `options`  | An object containing options.                       | `PromptOptions` | ❌       |

The following values are currently available for the model
More will be added in the future.

| Model                | Description                                  | Available |
| -------------------- | -------------------------------------------- | --------- |
| `gpt-3.5-turbo-0301` | The default model.                           | ✅        |
| `gpt-3.5-turbo`      | -                                            | ✅        |
| `gpt-4`              | GPT-4 is the latest and most powerful model. | ✅        |

The following values can be specified by the user as messages to be passed to the prompt function.

| Key       | Description                 | Type                                  | Required |
| --------- | --------------------------- | ------------------------------------- | -------- |
| `role`    | The role of the message.    | `"system"`, `"assistant"` or `"user"` | ✅       |
| `content` | The content of the message. | `string`                              | ✅       |

The following values can be specified by the user as options to be passed to the prompt function.

| Key           | Description                                                                                                                                                                                                                                                                                                                                               | Type     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `apiKey`      | API key that can be obtained from the [OpenAI configuration page](https://platform.openai.com/account/api-keys). You can omit this value by setting the `OPENAI_API_KEY` environment variable.                                                                                                                                                            | `string` |
| `temperature` | **The lower the temperature, the more accurate the results.** API temperatures set to 0 or close to 0 (e.g. 0.1 or 0.2) tend to give better results in most cases; with GPT-3, the higher the temperature, the more creative and random the results, while with Codex, the higher the temperature, the more truly random and erratic the response can be. | `number` |

For detailed specifications of the ChatGPT API, please refer to [this document](https://platform.openai.com/docs/api-reference/chat/create).

## Response Type

There are two types of return values for the `prompt` function: `ChatGPT` and `ChatGPTError`.

| Type           | Description                                             |
| -------------- | ------------------------------------------------------- |
| `ChatGPT`      | The response from the ChatGPT API.                      |
| `ChatGPTError` | The response from the ChatGPT API when an error occurs. |

`ChatGPT` by type is as follows:

```ts
type ChatGPT = {
  choices?:
    | {
        message: {
          role: string;
          content: string;
        };
        finish_reason: string;
        index: number;
      }[]
    | undefined;
  object: string;
  id: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};
```

Next, `ChatGPTError` as a type is as follows:

```ts
type ChatGPTError = {
  error: {
    message: string;
    type: string;
    param: string | null;
    code: string | null;
  };
};
```

## Team

| ![](https://avatars.githubusercontent.com/u/66447334?v=4) |
| --------------------------------------------------------- |
| [Keisuke Takagi](https://github.com/takagimeow)           |

## License

This project is licensed under the terms of the MIT license.

[MIT](https://github.com/takagimeow/ts-chatgpt/blob/main/LICENSE)
