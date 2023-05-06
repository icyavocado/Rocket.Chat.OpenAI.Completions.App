import {
    IModify, IRead
} from "@rocket.chat/apps-engine/definition/accessors";
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";

export async function addReactions(
    modify: IModify,
    message: IMessage,
    read: IRead,
    reactions: Array<string>
): Promise<void> {

    var bot_user = await read.getUserReader().getAppUser();

    if (!message.id || !bot_user) return;

    const msgBuilder = await modify
        .getUpdater()
        .message(message.id, bot_user);

    if (!msgBuilder['msg'].reactions) msgBuilder['msg'].reactions = {};

    const newReactions = reactions.reduce((accumulator, currentReaction) => {
        accumulator[currentReaction] = { usernames: [ bot_user?.username ] };
        return accumulator;
    }, {});

    msgBuilder['msg'].reactions = {
        ...msgBuilder['msg'].reactions,
        ...newReactions
    };

    msgBuilder.setEditor(message.sender);

    return await modify.getUpdater().finish(msgBuilder);
}

export async function removeReactions(
    modify: IModify,
    message: IMessage,
    read: IRead
): Promise<void> {

    var bot_user = await read.getUserReader().getAppUser();

    if (!message.id || !bot_user) return;

    const msgBuilder = await modify
        .getExtender()
        .extendMessage(message.id, bot_user);

    msgBuilder['msg'].reactions = {};

    return await modify.getExtender().finish(msgBuilder);

}

