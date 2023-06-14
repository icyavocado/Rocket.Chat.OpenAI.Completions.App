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
    ENABLE_REACTION = "openai_chat_enable_reaction",
    ENABLE_MENTION = "openai_chat_enable_mention",
    ENABLE_IN_PRIVATE_ROOM = "openai_chat_enable_in_private_room"
}

export const settings: Array<ISetting> = [
    {
        id: AppSetting.OpenAI_API_KEY,
        public: true,
        type: SettingType.STRING,
        packageValue: "",
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_API_KEY_LABEL",
        i18nDescription: AppSetting.NAMESPACE + "_API_KEY_LABEL_description",
        required: true,
    },
    {
        id: AppSetting.OpenAI_CHAT_MODEL,
        public: true,
        type: SettingType.SELECT,
        packageValue: "gpt-3.5-turbo",
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_CHAT_MODEL_LABEL",
        i18nDescription: AppSetting.NAMESPACE + "_CHAT_MODEL_LABEL_description",
        required: true,
        values: [
            {
                key: "gpt-3.5-turbo",
                i18nLabel: "gpt-3.5-turbo"
            },
            {
                key: "gpt-3.5-turbo-0301",
                i18nLabel: "gpt-3.5-turbo-0301"
            },
            {
                key: "gpt-3.5-turbo-0613",
                i18nLabel: "gpt-3.5-turbo-0613"
            },
            {
                key: "gpt-3.5-turbo-16k",
                i18nLabel: "gpt-3.5-turbo-16k"
            },
            {
                key: "gpt-3.5-turbo-16k-0613",
                i18nLabel: "gpt-3.5-turbo-16k-0613"
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
        i18nDescription: AppSetting.NAMESPACE + "_DEFAULT_SYSTEM_INSTRUCTION_LABEL_description",
        required: false,
    },
    {
        id: AppSetting.OpenAI_ORG,
        public: true,
        type: SettingType.STRING,
        packageValue: null,
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_ORG_LABEL",
        i18nDescription: AppSetting.NAMESPACE + "_ORG_LABEL_description",
        required: false,
    },
    {
        id: AppSetting.OpenAI_CHAT_MAX_TOKENS,
        public: true,
        type: SettingType.NUMBER,
        packageValue: null,
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_MAX_TOKENS_LABEL",
        i18nDescription: AppSetting.NAMESPACE + "_MAX_TOKENS_LABEL_description",
        required: false,
    },
    {
        id: AppSetting.OpenAI_CHAT_TEMPERATURE,
        public: true,
        type: SettingType.STRING,
        packageValue: null,
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_TEMPERATURE_LABEL",
        i18nDescription: AppSetting.NAMESPACE + "_TEMPERATURE_LABEL_description",
        required: false,
    },
    {
        id: AppSetting.OpenAI_HELP,
        public: true,
        type: SettingType.STRING,
        multiline: true,
        packageValue: null,
        value: "Type `/chatgpt` and hit enter to start",
        i18nPlaceholder: "Type `/chatgpt` and hit enter to start",
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_HELP",
        i18nDescription: AppSetting.NAMESPACE + "_HELP_description",
        required: false,
    },
    {
        id: AppSetting.ENABLE_REACTION,
        public: true,
        type: SettingType.BOOLEAN,
        packageValue: false,
        value: false,
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_ENABLE_REACTION",
        i18nDescription: AppSetting.NAMESPACE + "_ENABLE_REACTION_description",
        required: false,
        section: AppSetting.NAMESPACE + "_SETTING_SECTION_BOT_CONFIG"
    },
    {
        id: AppSetting.ENABLE_MENTION,
        public: true,
        type: SettingType.BOOLEAN,
        multiline: true,
        packageValue: false,
        value: false,
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_ENABLE_MENTION",
        i18nDescription: AppSetting.NAMESPACE + "_ENABLE_MENTION_description",
        required: false,
    },
    {
        id: AppSetting.ENABLE_IN_PRIVATE_ROOM,
        public: true,
        type: SettingType.BOOLEAN,
        multiline: true,
        packageValue: false,
        value: false,
        hidden: false,
        i18nLabel: AppSetting.NAMESPACE + "_ENABLE_IN_PRIVATE_ROOM",
        i18nDescription: AppSetting.NAMESPACE + "_ENABLE_IN_PRIVATE_ROOM_description",
        required: false,
        section: AppSetting.NAMESPACE + "_SETTING_SECTION_BOT_CONFIG"
    },
];
