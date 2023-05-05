import {
    ISetting,
    SettingType,
} from "@rocket.chat/apps-engine/definition/settings";

export enum AppSetting {
    NAMESPACE = "OpenAIChat",
    OpenAI_ORG = "openai_organization",
    OpenAI_CHAT_MODEL = "openai_chat_model",
    OpenAI_API_KEY = "openai_api_key",
    OpenAI_HELP = "openai_help",
    OpenAI_CHAT_DEFAULT_SYSTEM_INSTRUCTION = "openai_chat_default_system_instruction",
    OpenAI_CHAT_MAX_TOKENS = "openai_chat_max_tokens",
    OpenAI_CHAT_TEMPERATURE = "openai_chat_temperature",
}

export const settings: Array<ISetting> = [
    {
        id: AppSetting.OpenAI_API_KEY,
        public: true,
        type: SettingType.PASSWORD,
        packageValue: "",
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_API_KEY_LABEL",
        required: true,
    },
    {
        id: AppSetting.OpenAI_CHAT_MODEL,
        public: true,
        type: SettingType.SELECT,
        packageValue: "gpt-3.5-turbo",
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_CHAT_MODEL_LABEL",
        required: true,
        values: [
            {
                key: "gpt-3.5-turbo",
                i18nLabel: "gpt-3.5-turbo"
            },
            {
                key: "gpt-3.5-turbo-0301",
                i18nLabel: "gpt-3.5-turbo-0301",
            }
        ]
    },
    {
        id: AppSetting.OpenAI_CHAT_DEFAULT_SYSTEM_INSTRUCTION,
        public: true,
        type: SettingType.STRING,
        packageValue: "Your are a helpful assistant.",
        value: "Your are a helpful assistant.",
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_DEFAULT_SYSTEM_INSTRUCTION_LABEL",
        required: false,
    },
    {
        id: AppSetting.OpenAI_ORG,
        public: true,
        type: SettingType.STRING,
        packageValue: null,
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_ORG_LABEL",
        required: false,
    },
    {
        id: AppSetting.OpenAI_CHAT_MAX_TOKENS,
        public: true,
        type: SettingType.NUMBER,
        packageValue: null,
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_MAX_TOKENS_LABEL",
        required: false,
    },
    {
        id: AppSetting.OpenAI_CHAT_TEMPERATURE,
        public: true,
        type: SettingType.STRING,
        packageValue: null,
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_TEMPERATURE_LABEL",
        required: false,
    },
    {
        id: AppSetting.OpenAI_HELP,
        public: true,
        type: SettingType.STRING,
        packageValue: null,
        value: "Type `/chatgpt` and hit enter to start",
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_HELP",
        required: false,
    },
];
