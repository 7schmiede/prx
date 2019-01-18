import { IStore, IOriginConfig, IOrigin, IProject } from '../../../common';

const Conf = require('conf');

const CONFIG_NAME = 'prx.origin';
const CONFIG_NODE = '';
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

  set(value: IOriginConfig) {
    this.config.set(CONFIG_NODE, value);
  }
}
