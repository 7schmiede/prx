import { IOriginConfig, IUserConfig, ILocalConfig, IProjectConfig } from '..';

export interface IConfig {
  version: string;
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

export interface IPrxConfig extends IConfig, IOriginConfig, IUserConfig, ILocalConfig, IProjectConfig {}

export type ConfigScope = 'config' | 'origin' | 'user' | 'local' | 'prx';
