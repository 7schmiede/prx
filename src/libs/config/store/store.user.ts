import { IStore, IOrigin, IUserConfig, IProject, ConfigScope } from '../../../common';

const Conf = require('conf');

const CONFIG_NAME = 'prx.user';
const SCOPE = 'user';

export class UserStore implements IStore {
  private config = new Conf({ configName: CONFIG_NAME });

  get(): IUserConfig {
    const store = this.config.store;
    if (!store) {
      return null;
    }
    return {
      origins: store.origins ? store.origins.map((i: IOrigin) => ({ ...i, scope: SCOPE })) : [],
      projects: store.projects ? store.projects.map((i: IProject) => ({ ...i, scope: SCOPE })) : []
    };
  }

  set(value: IUserConfig, scope: ConfigScope = SCOPE) {
    this.config.set(value);
  }
}
