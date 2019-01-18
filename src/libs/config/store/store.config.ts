import { IStore, IConfig, ConfigScope } from '../../../common';

const Conf = require('conf');

const CONFIG_NAME = 'prx.config';
const SCOPE = 'config';

export class ConfigStore implements IStore {
  private config = new Conf({ configName: CONFIG_NAME });

  get(): IConfig {
    const store = this.config.store;
    console.log(this.config.path);
    if (!store) {
      return null;
    }
    return {
      version: store.version
    };
  }

  set(value: IConfig, scope: ConfigScope = SCOPE) {
    this.config.set(value);
  }
}
