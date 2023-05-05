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
import { sendNotification } from "../lib/SendNotification";
import { OpenAiChatApp } from "../OpenAiChatApp";

export class OpenAIChatHelpCommand implements ISlashCommand {
    public command = "chatgpt-help";
    public i18nParamsExample = AppSetting.NAMESPACE + "_Help_SlashCommand_Params";
    public i18nDescription = AppSetting.NAMESPACE + "_Help_SlashCommand_Description";
    public providesPreview = false;

    constructor(private readonly app: OpenAiChatApp) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp
    ): Promise<void> {
        const room = context.getRoom();
        const sender = context.getSender();
        const threadId = context.getThreadId();
        const triggerId = context.getTriggerId();

        const { value: CHATGPT_HELP } = await read
        .getEnvironmentReader()
        .getSettings()
        .getById(AppSetting.OpenAI_HELP);

        if (!triggerId) {
            return this.app.getLogger().error("TRIGGER UNDEFINED");
        }

        sendNotification(modify, room, sender, CHATGPT_HELP, threadId);

    }
}
