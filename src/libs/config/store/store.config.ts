import { IStore, IConfig } from '../../../common';

const Conf = require('conf');

const CONFIG_NAME = 'prx.config';
const CONFIG_NODE = '';
// const SCOPE = 'config';

export class ConfigStore implements IStore {
  private config = new Conf({ configName: CONFIG_NAME });

  get(): IConfig {
    const store = this.config.store;
    if (!store) {
      return null;
    }
    return {
      version: store.version
    };
  }

  set(value: IConfig) {
    this.config.set(CONFIG_NODE, value);
  }
}
