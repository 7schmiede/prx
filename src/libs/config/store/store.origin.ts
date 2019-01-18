import { IStore, IOriginConfig, IOrigin } from '../../../common';

const Conf = require('conf');

const CONFIG_NODE = '';
const SCOPE = 'origin';

export class OriginStore implements IStore {
  private config = new Conf({ configName: 'prx.origin' });

  get(): IOriginConfig {
    const store = this.config.store;
    if (!store) {
      return null;
    }
    return {
      origins: store.origins.map((i: IOrigin) => ({ ...i, scope: SCOPE }))
    };
  }

  set(value: IOriginConfig) {
    this.config.set(CONFIG_NODE, value);
  }
}
