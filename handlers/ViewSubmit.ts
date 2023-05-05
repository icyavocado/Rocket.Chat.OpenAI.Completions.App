import {
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { UIKitViewSubmitInteractionContext } from "@rocket.chat/apps-engine/definition/uikit";
import { AppSetting } from "../config/Settings";
import { OpenAiCompletionRequest } from "../lib/RequestOpenAiChat";
import { sendDirect } from "../lib/SendDirect";
import { sendMessage } from "../lib/SendMessage";
import { sendNotification } from "../lib/SendNotification";
import { OpenAiChatApp } from "../OpenAiChatApp";
import { SystemInstructionPersistence } from "../persistence/ChatGPTPersistence";

export class ViewSubmitHandler {
    public async executor(
        app: OpenAiChatApp,
        context: UIKitViewSubmitInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify,
        logger?: ILogger
    ) {
        const interaction_data = context.getInteractionData();

        if (interaction_data.view.id == "ask-chatgpt-submit-view") {
            //var prompt = interaction_data.view.state?.OpenAiCompletions_suggested_prompt
            if (interaction_data.view.state) {
                const completions_options =
                    interaction_data.view.state[
                        AppSetting.NAMESPACE + "_ask_chatgpt"
                    ];
                const prompt = completions_options["suggested_prompt"];
                const system_instruction = completions_options["instruction"];
                const output_options = completions_options["output_option"];
                const user = interaction_data.user;

                // process configurable system instruction
                const { value: OPEN_AI_DEFAULT_INSTRUCTION } = await read
                    .getEnvironmentReader()
                    .getSettings()
                    .getById(AppSetting.OpenAI_CHAT_DEFAULT_SYSTEM_INSTRUCTION);
                var instruction = OPEN_AI_DEFAULT_INSTRUCTION;
                // if the provided instruction difers from the default, we write it
                if (
                    completions_options["instruction"] !=
                    OPEN_AI_DEFAULT_INSTRUCTION
                ) {
                    await SystemInstructionPersistence.update(
                        persistence,
                        user.id,
                        completions_options["instruction"]
                    );
                    var instruction = completions_options["instruction"];
                }

                // do request
                OpenAiCompletionRequest(
                    app,
                    http,
                    read,
                    [
                        { role: "system", content: system_instruction },
                        { role: "user", content: prompt },
                    ],
                    user
                ).then((result) => {
                    for (var output of output_options) {
                        // get room, output_mode and other from the output option
                        const output_mode = output.split("#")[0];
                        const room_id = output.split("#")[1];
                        var thread_id = output.split("#")[2];
                        if (thread_id == "undefined") {
                            thread_id = undefined;
                        }
                        read.getRoomReader()
                            .getById(room_id)
                            .then((room) => {
                                if (!room) {
                                    return {
                                        success: false,
                                        message: "No room found",
                                    };
                                }

                                if (!result.success) {
                                    sendNotification(
                                        modify,
                                        room,
                                        user,
                                        `**Error!** Could not Request Completion:\n\n` +
                                            result.content.error.message
                                    );
                                } else {
                                    var content = result.content.choices[0].message
                                    .content as string;
                                // remove initial break lines
                                content = content.replace(/^\s*/gm, "");
                                var before_message = `**Instruction**: ${instruction}\n**Prompt**: ${prompt}`;
                                var message = before_message + "\n**Response:** " + content;

                                    switch (output_mode) {
                                        case "notification":
                                            sendNotification(
                                                modify,
                                                room,
                                                user,
                                                before_message + message,
                                                thread_id
                                            );
                                            break;

                                        case "direct":
                                            sendDirect(
                                                user,
                                                read,
                                                modify,
                                                message
                                            );
                                            break;

                                        case "thread":
                                            sendMessage(
                                                modify,
                                                room,
                                                message,
                                                undefined,
                                                thread_id
                                            );
                                            break;

                                        case "message":
                                            sendMessage(
                                                modify,
                                                room,
                                                message
                                            );
                                            break;

                                        default:
                                            break;
                                    }
                                }
                                return {
                                    success: true,
                                };
                            });
                    }
                });
            }
        }
        return {
            success: true,
        };
    }
}
