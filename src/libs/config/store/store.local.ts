import { IStore, ILocalConfig, IOrigin, IProject, ConfigScope } from '../../../common';

const Conf = require('conf');

const CONFIG_NAME = 'prx.local';
const SCOPE = 'local';

export class LocalStore implements IStore {
  private config = new Conf({ configName: CONFIG_NAME });

  get(): ILocalConfig {
    const store = this.config.store;
    if (!store) {
      return null;
    }
    return {
      origins: store.origins ? store.origins.map((i: IOrigin) => ({ ...i, scope: SCOPE })) : [],
      projects: store.projects ? store.projects.map((i: IProject) => ({ ...i, scope: SCOPE })) : []
    };
  }

  set(value: ILocalConfig, scope: ConfigScope = SCOPE) {
    this.config.set(value);
  }
}
