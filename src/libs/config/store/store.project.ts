import { IStore, IProject, ConfigScope } from '../../../common';
import * as fs from 'fs';
import * as path from 'path';

const CONFIG_NAME = 'prx.json';
const SCOPE = 'prx';

export class ProjectStore implements IStore {
  private projectPrxFile = path.join(process.cwd(), CONFIG_NAME);

  private get config(): IProject {
    if (fs.existsSync(this.projectPrxFile)) {
      const data = fs.readFileSync(this.projectPrxFile, 'utf8');
      const prx = JSON.parse(data);
      this._config = {
        ...prx,
        scope: SCOPE
      };
    }
    return this._config;
  }
  private _config: any;

  get(): IProject {
    return this.config;
  }

  set(value: IProject, scope: ConfigScope = SCOPE) {
    fs.writeFileSync(this.projectPrxFile, JSON.stringify(value), 'utf8');
  }
}
