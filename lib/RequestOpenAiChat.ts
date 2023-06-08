import {
    IHttp,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { AppSetting } from "../config/Settings";
import { OpenAiChatApp } from "../OpenAiChatApp";

export async function OpenAiCompletionRequest(
    app: OpenAiChatApp,
    http: IHttp,
    read: IRead,
    prompt: any,
    sender: IUser
): Promise<any> {
    // get configs
    const { value: API_KEY } = await read
        .getEnvironmentReader()
        .getSettings()
        .getById(AppSetting.OpenAI_API_KEY);
    const { value: OPEN_AI_CHAT_MAX_TOKENS } = await read
        .getEnvironmentReader()
        .getSettings()
        .getById(AppSetting.OpenAI_CHAT_MAX_TOKENS);
    const { value: OPEN_AI_ORG } = await read
        .getEnvironmentReader()
        .getSettings()
        .getById(AppSetting.OpenAI_ORG);
    const { value: OPEN_AI_CHAT_TEMPERATURE } = await read
        .getEnvironmentReader()
        .getSettings()
        .getById(AppSetting.OpenAI_CHAT_TEMPERATURE);
    const { value: OPENAI_CHAT_MODEL } = await read
        .getEnvironmentReader()
        .getSettings()
        .getById(AppSetting.OpenAI_CHAT_MODEL);
    // request completion and return
    var headers = {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
    };
    if (OPEN_AI_ORG) {
        headers["OpenAI-Organization"] = OPEN_AI_ORG;
    }
    var temperature = parseFloat(OPEN_AI_CHAT_TEMPERATURE)
    // if temperature is not a float or integer
    if(!temperature){
        temperature = 1
    }
    const payload = {
        user: sender.id,
        model: OPENAI_CHAT_MODEL,
        messages: prompt,
        max_tokens: OPEN_AI_CHAT_MAX_TOKENS,
        temperature: temperature,
    };
    return http
        .post("https://api.openai.com/v1/chat/completions", {
            headers: headers,
            data: payload,
        })
        .then((ok) => {
            var result = {
                success: true,
                prompt: prompt,
                content: ok.data,
                user: sender.id,
            };
            if ("error" in ok.data) {
                result["success"] = false;
                // this is necessary for the link to be rendered correctly
                // due to a bug in RC parser.
                result["content"]["error"]["message"] = result["content"][
                    "error"
                ]["message"].replace("api-keys.", "api-keys");
            }
            app.getLogger().info(
                `Got new completion`,
                result,
                `for the payload`,
                payload
            );
            return result;
        })
        .catch((error) => {
            app.getLogger().error(
                `Error while getting new completion for prompt ${prompt}: `,
                error
            );
            return { success: false };
        });
}

export async function OpenAIImageRequest(
    app: OpenAiChatApp,
    http: IHttp,
    read: IRead,
    prompt: any,
    sender: IUser
): Promise<any> {
    // get configs
    const { value: API_KEY } = await read
        .getEnvironmentReader()
        .getSettings()
        .getById(AppSetting.OpenAI_API_KEY);
    const { value: OPEN_AI_CHAT_MAX_TOKENS } = await read
        .getEnvironmentReader()
        .getSettings()
        .getById(AppSetting.OpenAI_CHAT_MAX_TOKENS);
    const { value: OPEN_AI_ORG } = await read
        .getEnvironmentReader()
        .getSettings()
        .getById(AppSetting.OpenAI_ORG);
    const { value: OPEN_AI_CHAT_TEMPERATURE } = await read
        .getEnvironmentReader()
        .getSettings()
        .getById(AppSetting.OpenAI_CHAT_TEMPERATURE);
    const { value: OPENAI_CHAT_MODEL } = await read
        .getEnvironmentReader()
        .getSettings()
        .getById(AppSetting.OpenAI_CHAT_MODEL);
    // request completion and return
    var headers = {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
    };
    if (OPEN_AI_ORG) {
        headers["OpenAI-Organization"] = OPEN_AI_ORG;
    }
    var temperature = parseFloat(OPEN_AI_CHAT_TEMPERATURE)
    // if temperature is not a float or integer
    if(!temperature){
        temperature = 1
    }
    const payload = {
        user: sender.id,
        prompt: prompt,
        n: temperature,
        size: '256x256'
    };
    return http
        .post("https://api.openai.com/v1/images/generations", {
            headers: headers,
            data: payload,
        })
        .then((ok) => {
            app.getLogger().debug(ok);
            var result = {
                success: true,
                prompt: prompt,
                content: ok.data,
                user: sender.id,
            };
            if ("error" in ok.data) {
                result["success"] = false;
                // this is necessary for the link to be rendered correctly
                // due to a bug in RC parser.
                result["content"]["error"]["message"] = result["content"][
                    "error"
                ]["message"].replace("api-keys.", "api-keys");
            }
            app.getLogger().info(
                `Got new completion`,
                result,
                `for the payload`,
                payload
            );
            return result;
        })
        .catch((error) => {
            app.getLogger().error(
                `Error while getting new completion for prompt ${prompt}: `,
                error
            );
            return { success: false };
        });
    return
}
