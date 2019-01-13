import { exec } from 'child_process';

const Conf = require('conf');
const config = new Conf({ configName: 'config' });

interface Project {
  path: string;
  name: string;
}

const PROJECTS = 'projects';

class Store {
  getProjects() {
    const projects: Project[] = config.get(PROJECTS, []);
    return projects;
  }

  addProject(path: string, name: string): boolean {
    let projects = this.getProjects();
    const projectExists = projects.find(project => {
      return project.path === path && project.name === name;
    });
    if (projectExists) {
      return false;
    }

    projects.push({ path: path, name: name });
    config.set(PROJECTS, projects);
    return true;
  }

  removeProject(name: string): boolean {
    let projects = this.getProjects();
    const projectId = projects.findIndex(project => {
      return project.name === name;
    });
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
}

export default Store;
