import { IStore, IOriginConfig, IOrigin, IProject, ConfigScope } from '../../../common';

const Conf = require('conf');

const CONFIG_NAME = 'prx.origin';
const SCOPE = 'origin';

export class OriginStore implements IStore {
  private config = new Conf({ configName: CONFIG_NAME });

  get(): IOriginConfig {
    const store = this.config.store;
    if (!store) {
      return null;
    }
    return {
      origins: store.origins ? store.origins.map((i: IOrigin) => ({ ...i, scope: SCOPE })) : [],
      projects: store.projects ? store.projects.map((i: IProject) => ({ ...i, scope: SCOPE })) : []
    };
  }

  set(value: IOriginConfig, scope: ConfigScope = SCOPE) {
    this.config.set(value);
  }
}
