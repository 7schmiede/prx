import { IConfig, IOriginConfig, IUserConfig, ILocalConfig, IProjectConfig, IProject, ConfigScope } from '..';

export interface IStore {
  get(): IConfig | IOriginConfig | IUserConfig | ILocalConfig | IProjectConfig | IProject;
  set(config: IConfig | IOriginConfig | IUserConfig | ILocalConfig | IProjectConfig | IProject, scope: ConfigScope): void;
}
