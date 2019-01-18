export interface IConfig {
  origins: IOrigin[];
  projects: IProject[];
}

export interface IOrigin {
  scope: ConfigScope;
  id: string;
  source: ISource;
}

export interface ISource {
  type: string;
}

export interface IPrxSource extends ISource {}

export interface IGitSource extends ISource {}

export interface ICustomSource extends ISource {}

export interface IProject {
  scope: ConfigScope;
  id: string;
  path: string;
}

export type ConfigScope = 'config' | 'orgin' | 'user' | 'local' | 'prx';
