// config.ts
export interface DynamicConfig {
    apiUrl: string;
    arcgisServerUrl :string
    version :string

}

export const defaultConfig: DynamicConfig = {
    apiUrl: "",
    arcgisServerUrl: "",
    version: "",
};

class GlobalConfig {
    config: DynamicConfig = defaultConfig;
}

export const globalConfig = new GlobalConfig();

export const globalConfigUrl = "config.json";
