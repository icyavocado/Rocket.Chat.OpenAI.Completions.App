import {
    ISetting,
    SettingType,
} from "@rocket.chat/apps-engine/definition/settings";

export enum AppSetting {
    NAMESPACE = "OpenAIChat",
    OpenAI_ORG = "openai_organization",
    OpenAI_CHAT_MODEL = "openai_chat_model",
    OpenAI_API_KEY = "openai_api_key",
    OpenAI_CHAT_DEFAULT_SYSTEM_INSTRUCTION = "openai_chat_default_system_instruction",
    OpenAI_CHAT_MAX_TOKENS = "openai_chat_max_tokens",
    OpenAI_CHAT_TEMPERATURE = "openai_chat_temperature",
    OpenAI_CHAT_TIMEOUT = "openai_chat_timeout"
}

export const settings: Array<ISetting> = [
    {
        id: AppSetting.OpenAI_API_KEY,
        public: true,
        type: SettingType.STRING,
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
        id: AppSetting.OpenAI_CHAT_TIMEOUT,
        public: true,
        type: SettingType.NUMBER,
        packageValue: 0,
        value: 0,
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_TIMEOUT_LABEL",
        i18nDescription: AppSetting.NAMESPACE + "_TIMEOUT_description",
        required: false,
    },
];
