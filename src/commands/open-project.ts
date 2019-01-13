import * as colors from 'colors';
import { store, openInEditor } from '../libs';
import inquirer = require('inquirer');

const OPEN_VS_CODE = 'VS Code';
const OPEN_EXPLORER = 'Explorer';

export function openProjectCommand() {
  const projects = store.getProjects();
  const projectNames = projects.map(p => p.name);
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'name',
        choices: projectNames
      },
      {
        type: 'list',
        name: 'action',
        choices: [OPEN_VS_CODE, OPEN_EXPLORER]
      }
    ])
    .then((answers: any) => {
      const { name, action } = answers;
      const project = projects.find(p => p.name === name);
      if (!project) {
        return; // should never happen!
      }
      openInEditor(action, project.path);
    });
}
