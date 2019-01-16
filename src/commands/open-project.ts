import * as colors from 'colors';
import { readEditors } from './../libs/editors';
import { store, openInEditor } from '../libs';
import inquirer = require('inquirer');

const OPEN_VS_CODE = 'VS Code';
const OPEN_EXPLORER = 'Explorer';
const OPEN_VISUAL_STUDIO = 'Visual Studio';

export function openProjectCommand() {
  const projects = store.getProjects();
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'name',
        choices: projects.map(p => p.name)
      },
      {
        type: 'list',
        name: 'action',
        choices: readEditors()
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
