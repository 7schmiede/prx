import { IStore, ICompanyConfig } from '@common';

const Conf = require('conf');

const CONFIG_NODE = '';

export class CompanyStore implements IStore {
  private config = new Conf({ configName: 'prx.company' });

  get(): ICompanyConfig {
    return this.config.store;
  }

  set(value: ICompanyConfig) {
    this.config.set(CONFIG_NODE, value);
  }
}
