import { exec } from 'child_process';
import * as crypto from 'crypto';

const Conf = require('conf');
const config = new Conf({ configName: 'config' });

export interface Project {
  id: string;
  path: string;
  name: string;
}

const PROJECTS = 'projects';

class Store {
  getProjects() {
    const projects: Project[] = config.get(PROJECTS, []);
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
    config.set(PROJECTS, projects);
    return true;
  }

  updateProject(id: string, update: Project) {
    let projects = this.getProjects();
    const projectId = projects.findIndex(project => project.id === id);
    if (projectId === -1) {
      return false;
    }

    projects[projectId] = update;
    config.set(PROJECTS, projects);
    return true;
  }

  removeProject(id: string) {
    let projects = this.getProjects();
    const projectId = projects.findIndex(project => project.id === id);
    if (projectId === -1) {
      return false;
    }

    projects.splice(projectId, 1);
    config.set(PROJECTS, projects);
    return true;
  }

  openConfigInEditor = () => {
    exec('start ' + config.path);
  };

  private generateGuid() {
    return crypto.randomBytes(16).toString('hex');
  }
}

export default Store;
