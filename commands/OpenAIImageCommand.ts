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
import { OpenAiCompletionRequest, OpenAIImageRequest } from "../lib/RequestOpenAiChat";
import { sendMessage } from "../lib/SendMessage";
import { sendNotification } from "../lib/SendNotification";
import { OpenAiChatApp } from "../OpenAiChatApp";
import { SystemInstructionPersistence } from "../persistence/ChatGPTPersistence";
import { createAskChatGPTModal } from "../ui/AskChatGPTModal";
import { BlockBuilder, TextObjectType } from "@rocket.chat/apps-engine/definition/uikit";

export class OpenAIImageCommand implements ISlashCommand {
    public command = "dalle";
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

        if (prompt_array.length == 0) return;

        var prompt = prompt_array.join(" ");
        const result = await OpenAIImageRequest(
            this.app,
            http,
            read,
            prompt,
            sender
        );
        if (result.success) {
            // format return
            var content = result.content.data;
            const block = modify.getCreator().getBlockBuilder();
            content.forEach(imageData => {
                block.addImageBlock({
                    appId: this.app.getID(),
                    imageUrl: imageData.url,
                    altText: "placeholder",
                    title: {
                        text: "placeholder",
                        type: TextObjectType.PLAINTEXT
                    }
                })
            })

            const messageBuilder = modify.getCreator().startMessage().setRoom(room).addBlocks(block);
            await modify.getCreator().finish(messageBuilder);
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
