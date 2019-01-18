import { IStore, IProject } from '../../../common';
import * as fs from 'fs';
import * as path from 'path';

const SCOPE = 'prx';

export class ProjectStore implements IStore {
  private get config(): IProject {
    const projectPrxFile = path.join(process.cwd(), 'prx.json');
    if (fs.existsSync(projectPrxFile)) {
      const data = fs.readFileSync(projectPrxFile, 'utf8');
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

  set(value: IProject) {
    throw new Error('not implemented');
  }
}
