import { exec } from 'child_process';
import * as crypto from 'crypto';

import { IStore, IConfig, IOriginConfig, IProject, IPrxConfig, IUserConfig, ILocalConfig } from '../../../common';
import { OriginStore } from './store.origin';
import { ProjectStore } from './store.project';
import { UserStore } from './store.user';
import { ConfigStore } from './store.config';
import { LocalStore } from './store.local';

class Store implements IStore {
  // origin = new Conf({ configName: 'prx.origin' });
  // user = new Conf({ configName: 'prx.user' });
  // local = new Conf({ configName: 'prx.local' });

  private configStore = new ConfigStore();
  private get configData(): IConfig {
    if (!this._configData) {
      this._configData = this.configStore.get();
    }
    return this._configData;
  }
  private _configData: IConfig;

  private originStore = new OriginStore();
  private get originData(): IOriginConfig {
    if (!this._originData) {
      this._originData = this.originStore.get();
    }
    return this._originData;
  }
  private _originData: IOriginConfig;

  private userStore = new UserStore();
  private get userData(): IUserConfig {
    if (!this._userData) {
      this._userData = this.userStore.get();
    }
    return this._userData;
  }
  private _userData: IUserConfig;

  private localStore = new LocalStore();
  private get localData(): ILocalConfig {
    if (!this._localData) {
      this._localData = this.localStore.get();
    }
    return this._localData;
  }
  private _localData: ILocalConfig;

  private projectStore = new ProjectStore();
  private get projectData(): IProject {
    if (!this._projectData) {
      this._projectData = this.projectStore.get();
    }
    return this._projectData;
  }
  private _projectData: IProject;

  constructor() {}

  get() {
    let result: IPrxConfig = {
      ...this.configData,
      origins: this.flatById(this.originData.origins, this.userData.origins, this.localData.origins),
      projects: this.flatById(this.originData.projects, this.userData.projects, this.localData.projects, [this.projectData])
    };

    console.log(result);
  }

  set(value: any) {}

  flatById(...maps: any[]): any[] {
    const result = maps[0];
    maps.forEach(map => {
      map.forEach((row: any) => {
        if (!row) {
          return;
        }
        const ix = result.findIndex((i: any) => i.id === row.id);
        if (ix > -1) {
          result[ix] = { ...result[ix], ...row };
        } else {
          result.push(row);
        }
      });
    });
    return result;
  }

  getProjects() {
    const projects: IProject[] = []; // = config.get(PROJECTS, []);
    return projects;
  }

  addProject(path: string, name: string) {
    throw new Error('not implemented');
    // let projects = this.getProjects();
    // const projectExists = projects.find(project => {
    //   return project.path === path && project.name === name;
    // });
    // if (projectExists) {
    //   return false;
    // }

    // projects.push({ id: this.generateGuid(), path: path, name: name });
    // config.set(PROJECTS, projects);
    return true;
  }

  updateProject(id: string, update: IProject) {
    throw new Error('not implemented');

    // let projects = this.getProjects();
    // const projectId = projects.findIndex(project => project.id === id);
    // if (projectId === -1) {
    //   return false;
    // }

    // projects[projectId] = update;
    // config.set(PROJECTS, projects);
    return true;
  }

  removeProject(id: string) {
    throw new Error('not implemented');

    // let projects = this.getProjects();
    // const projectId = projects.findIndex(project => project.id === id);
    // if (projectId === -1) {
    //   return false;
    // }

    // projects.splice(projectId, 1);
    // config.set(PROJECTS, projects);
    return true;
  }

  openConfigInEditor = () => {
    exec('start ' + this.configData);
  };

  private generateGuid() {
    return crypto.randomBytes(16).toString('hex');
  }
}

export default Store;
