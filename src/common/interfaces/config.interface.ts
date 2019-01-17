export interface IConfig {
  settings: IConfigSettings;
}

export interface IConfigSettings {
  companies: IConfigCompany[];
}

export interface IConfigCompany {
  id: string;
  source: IConfigSource;
}

export interface IConfigSource {
  type: string;
}

export interface IConfigSourcePrx extends IConfigSource {}

export interface IConfigSourceGit extends IConfigSource {}

export interface IConfigSourceCustom extends IConfigSource {}
