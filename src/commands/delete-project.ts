import * as inquirer from 'inquirer';
import * as colors from 'colors';
import { store } from '../libs';

export function deleteProjectCommand() {
  const projects = store.getProjects();
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'project',
        message: 'Choose project to delete',
        choices: projects.map(project => project.id)
      },
      {
        type: 'confirm',
        name: 'confirmed',
        message: 'Delete this project?'
      }
    ])
    .then((answers: any) => {
      const { project, confirmed } = answers;
      if (confirmed) {
        store.removeProject(project);
        console.log(colors.green('Project deleted.'));
      }
    });
}
