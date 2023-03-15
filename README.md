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

| Function | Description                     | Parameters                                                                                                   | Return                     |
| -------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `prompt` | Get a response from ChatGPT API | `props` - The props contains an model name you want to use for the ChatGPT API and an array of Message type. | `Promise<ChatGPTResponse>` |

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
});
```

Since `dotenv.config()` is automatically called internally, developers do not need to install dotenv to load OPENAI_API_KEY themselves.

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

For detailed specifications of the ChatGPT API, please refer to [this document](https://platform.openai.com/docs/api-reference/chat/create).

## Response Type

There are two types of return values for the `prompt` function: `ChatGPT` and `ChatGPTError`.
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

Next, ChatGPTError as a type is as follows:

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
