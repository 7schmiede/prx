import { exec } from 'child_process';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

import { IStore } from '@common';
import { CompanyStore } from './store.company';

const Conf = require('conf');

export interface Project {
  id: string;
  path: string;
  name: string;
}

const CONFIG_NAME = 'prx.config';

class Store implements IStore {
  config = new Conf({ configName: CONFIG_NAME });
  // company = new Conf({ configName: 'prx.company' });
  // user = new Conf({ configName: 'prx.user' });
  // local = new Conf({ configName: 'prx.local' });

  constructor(private companyStore: CompanyStore) {}

  get() {
    let result = {
      ...this.config.store,
      ...this.companyStore.get()
      // ...user.store,
      // ...local.store
    };

    // prx from current dir
    const projectPrxFile = path.join(process.cwd(), 'prx.json');
    if (fs.existsSync(projectPrxFile)) {
      const data = fs.readFileSync(projectPrxFile, 'utf8');
      const prx = JSON.parse(data);
      result = {
        ...result,
        projects: [...(result && result.projects ? result.projects : []), ...(prx && prx.projects ? prx.projects : [])]
      };
    }

    console.log(result);
  }

  set(value: any) {}

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
    exec('start ' + this.config.path);
  };

  private generateGuid() {
    return crypto.randomBytes(16).toString('hex');
  }
}

export default Store;
