import {
    IHttp,
    IModify,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { AppSetting } from "../config/Settings";
import { GetUserSystemInstruction } from "../lib/GetUserSystemInstruction";
import { OpenAiCompletionRequest } from "../lib/RequestOpenAiChat";
import { sendMessage } from "../lib/SendMessage";
import { sendNotification } from "../lib/SendNotification";
import { OpenAiChatApp } from "../OpenAiChatApp";
import { SystemInstructionPersistence } from "../persistence/ChatGPTPersistence";
import { createAskChatGPTModal } from "../ui/AskChatGPTModal";

export class OpenAIChatCommand implements ISlashCommand {
    public command = "chatgpt";
    public i18nParamsExample = AppSetting.NAMESPACE + "_SlashCommand_Params";
    public i18nDescription = AppSetting.NAMESPACE + "_SlashCommand_Description";
    public providesPreview = false;

    constructor(private readonly app: OpenAiChatApp) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp
    ): Promise<void> {
        const prompt_array = context.getArguments();
        const room = context.getRoom();
        const sender = context.getSender();
        const threadId = context.getThreadId();
        const triggerId = context.getTriggerId();
        const instruction = await GetUserSystemInstruction(read, sender);

        if (!triggerId) {
            return this.app.getLogger().error("TRIGGER UNDEFINED");
        }

        if (prompt_array.length == 0) {
            // get initial system instruction

            var askChatGPT_Modal = createAskChatGPTModal(
                modify,
                room,
                undefined,
                instruction,
                threadId
            );
            return modify
                .getUiController()
                .openModalView(askChatGPT_Modal, { triggerId }, sender);
        } else {
            var prompt = prompt_array.join(" ");
            const payload = [{ role: "user", content: prompt }];
            const result = await OpenAiCompletionRequest(
                this.app,
                http,
                read,
                payload,
                sender
            );
            if (result.success) {
                // format return
                var content = result.content.choices[0].message
                    .content as string;
                // remove initial break lines
                content = content.replace(/^\s*/gm, "");
                var before_message = `**Instruction**: ${instruction}\n**Prompt**: ${prompt}`;
                var message = before_message + "\n**Answer:** " + content;
                sendMessage(
                    modify,
                    room,
                    message,
                    undefined,
                    context.getThreadId()
                );
            } else {
                sendNotification(
                    modify,
                    room,
                    sender,
                    `**Error!** Could not Request Completion:\n\n` +
                        result.content.error.message
                );
            }
        }
    }
}
