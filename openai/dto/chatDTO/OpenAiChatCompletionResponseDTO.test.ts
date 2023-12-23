// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpenAiChatCompletionResponseDTO,
    explainOpenAiChatCompletionResponseDTO,
    isOpenAiChatCompletionResponseDTO,
} from "./OpenAiChatCompletionResponseDTO";
import {OpenAiModel} from "../../types/OpenAiModel";
import {createOpenAiChatCompletionResponseChoice} from "./OpenAiChatCompletionResponseChoice";
import {createOpenAiChatCompletionMessage} from "./OpenAiChatCompletionMessage";
import {OpenAiUserType} from "../../types/OpenAiUserType";
import {createOpenAiCompletionResponseUsage} from "../OpenAiCompletionResponseUsage";

describe("OpenAiChatCompletionResponseDTO", () => {

    describe("createOpenAiChatCompletionResponseDTO", () => {

        it("creates valid OpenAiChatCompletionResponseDTO objects", () => {
            const result = createOpenAiChatCompletionResponseDTO(
                "1",
                "chat.completion",
                1677858242,
                OpenAiModel.GPT_3_5_TURBO_16K,
                [createOpenAiChatCompletionResponseChoice(
                    1,
                    createOpenAiChatCompletionMessage(
                        OpenAiUserType.USER,
                        "Hey, could you describe apple to me?"
                    ),
                    "stop",
                ),],
                createOpenAiCompletionResponseUsage(
                    200,
                    200,
                    500
                )
            );

            expect(result).toBeTruthy();
            expect(result).toStrictEqual(
                {
                    "choices": [
                        {
                            "finish_reason": "stop",
                            "index": 1,
                            "message": {
                                "content": "Hey, could you describe apple to me?",
                                "role": "user"
                            }
                        }
                    ],
                    "created": 1677858242,
                    "id": "1",
                    "model": "gpt-3.5-turbo-16k",
                    "object": "chat.completion",
                    "usage": {
                        "completion_tokens": 200,
                        "prompt_tokens": 200,
                        "total_tokens": 500
                    }
                }
            )
        });

    });

    describe("isOpenAiChatCompletionResponseDTO", () => {

        it("returns true for valid OpenAiChatCompletionResponseDTO objects", () => {
            const item = {
                "choices": [
                    {
                        "finish_reason": "stop",
                        "index": 1,
                        "message": {
                            "content": "Hey, could you describe apple to me?",
                            "role": "user"
                        }
                    }
                ],
                "created": 1677858242,
                "id": "1",
                "model": "gpt-3.5-turbo-16k",
                "object": "chat.completion",
                "usage": {
                    "completion_tokens": 200,
                    "prompt_tokens": 200,
                    "total_tokens": 500
                }
            };

            expect(isOpenAiChatCompletionResponseDTO(item)).toBeTruthy();

        });

            it("returns true for valid OpenAiChatCompletionResponseDTO objects", () => {
                const item = {
                    "choices": [
                        {
                            "finish_reason": "stop",
                            "index": "1",
                            "message": {
                                "content": "Hey, could you describe apple to me?",
                                "role": "user"
                            }
                        }
                    ],
                    "created": 1677858242,
                    "id": "1",
                    "model": "gpt-3.5-turbo-16k",
                    "object": "chat.completion",
                    "usage": {
                        "completion_tokens": 200,
                        "prompt_tokens": 200,
                        "total_tokens": 500
                    }
                };

                expect(isOpenAiChatCompletionResponseDTO(item)).toBe(false);
        });



    });

    describe("explainOpenAiChatCompletionResponseDTO", () => {

        it("returns a string explaining why the value is not a OpenAiChatCompletionResponseDTO", () => {

            const item = {
                "choices": [
                    {
                        "finish_reason": "stop",
                        "index": "1",
                        "message": {
                            "content": "Hey, could you describe apple to me?",
                            "role": "user"
                        }
                    }
                ],
                "created": [1677858242],
                "id": 1,
                "model": "gpt-3.5-turbo-16k",
                "object": "chat.completion",
                "usage": {
                    "completion_tokens": 200,
                    "prompt_tokens": 200,
                    "total_tokens": 500
                }
            };

            const result = explainOpenAiChatCompletionResponseDTO(item);
            expect(result).toEqual( expect.stringContaining( "property \"id\" not string" ) );
            expect(result).toEqual( expect.stringContaining( "property \"created\" not number" ) );
            expect(result).toEqual( expect.stringContaining( "property \"choices\" not OpenAiChatCompletionResponseChoice|OpenAiError" ) );
            expect(result).toEqual( expect.stringContaining( "property \"index\" not number" ) );

        });


        it("returns a string explaining why the OpenAiChatCompletionResponseDTO has extra keys", () => {
            const item = {
                "choices": [
                    {
                        "finish_reason": "stop",
                        "index": "1",
                        "message": {
                            "content": "Hey, could you describe apple to me?",
                            "role": "user",
                            "extra": "just saying",
                        }
                    }
                ],
                "created": [1677858242],
                "id": 1,
                "model": "gpt-3.5-turbo-16k",
                "params" : ["some extra data"],
                "object": "chat.completion",
                "usage": {
                    "completion_tokens": 200,
                    "prompt_tokens": 200,
                    "total_tokens": 500
                }
            };

            const result = explainOpenAiChatCompletionResponseDTO(item);

            expect(result).toEqual( expect.stringContaining("Value had extra properties: params") );
            expect(result).toEqual( expect.stringContaining("property \"id\" not string") );
            expect(result).toEqual( expect.stringContaining("property \"created\" not number") );
            expect(result).toEqual( expect.stringContaining("property \"choices\" not OpenAiChatCompletionResponseChoice|OpenAiError") );
            expect(result).toEqual( expect.stringContaining("property \"index\" not number") );
            expect(result).toEqual( expect.stringContaining("property \"message\" Value had extra properties: extra") );
        });


    });

});
