import * as colors from 'colors';
import { store } from '../libs';

export function listProjectsCommand() {
  const projects = store.getProjects();
  projects.map(project => {
    console.log(`${colors.blue(project.name)} ${colors.gray('- ' + project.path)}`);
  });
}
