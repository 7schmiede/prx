import { exec } from 'child_process';
import * as crypto from 'crypto';

import { IStore, IOriginConfig, IConfig, IProjectConfig, IProject } from '../../../common';
import { OriginStore } from './store.origin';
import { ProjectStore } from './store.project';

const Conf = require('conf');

export interface Project {
  id: string;
  path: string;
  name: string;
}

const CONFIG_NAME = 'prx.config';
const SCOPE = 'config';

class Store implements IStore {
  // origin = new Conf({ configName: 'prx.origin' });
  // user = new Conf({ configName: 'prx.user' });
  // local = new Conf({ configName: 'prx.local' });

  private config = new Conf({ configName: CONFIG_NAME });
  private get configData(): IConfig {
    if (!this._configData) {
      this._configData = {
        origins: this.config.store.origins.map(i => ({ ...i, scope: SCOPE })),
        projects: this.config.store.projects.map(i => ({ ...i, scope: SCOPE }))
      };
    }
    return this._configData;
  }
  private _configData: IConfig;

  private originStore = new OriginStore();
  private get originData(): IOriginConfig {
    if (!this._originData) {
      const originStoreData = this.originStore.get();
      this._originData = {
        origins: [...originStoreData.origins]
      };
    }
    return this._originData;
  }
  private _originData: IOriginConfig;

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
    let result: IConfig = {
      ...this.configData,
      origins: this.flatById(this.configData.origins, this.originData.origins),
      projects: this.flatById(this.configData.projects, [this.projectData])
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
    const projects: Project[] = []; // = config.get(PROJECTS, []);
    return projects;
  }

  addProject(path: string, name: string) {
    let projects = this.getProjects();
    const projectExists = projects.find(project => {
      return project.path === path && project.name === name;
    });
    if (projectExists) {
      return false;
    }

    projects.push({ id: this.generateGuid(), path: path, name: name });
    // config.set(PROJECTS, projects);
    return true;
  }

  updateProject(id: string, update: Project) {
    let projects = this.getProjects();
    const projectId = projects.findIndex(project => project.id === id);
    if (projectId === -1) {
      return false;
    }

    projects[projectId] = update;
    // config.set(PROJECTS, projects);
    return true;
  }

  removeProject(id: string) {
    let projects = this.getProjects();
    const projectId = projects.findIndex(project => project.id === id);
    if (projectId === -1) {
      return false;
    }

    projects.splice(projectId, 1);
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
