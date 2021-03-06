import * as inquirer from 'inquirer';
import * as colors from 'colors';
import { store, isDirectory } from '../libs';
import { IProject } from '../common';

export async function editProjectCommand() {
  const projects = store.getProjects();
  let answers = await inquirer.prompt<any>([
    {
      type: 'list',
      name: 'project',
      choices: projects.map(project => {
        return {
          name: `${project.id} - ${colors.gray(project.path)}`,
          value: project
        };
      })
    }
  ]);

  const { project } = answers;

  answers = await inquirer.prompt<IProject>([
    {
      type: 'input',
      name: 'name',
      default: `${project.name}`,
      message: 'Name of the project'
    },
    {
      type: 'input',
      name: 'path',
      default: `${project.path}`,
      message: 'Path of the project'
    }
  ]);

  const { name, path } = answers;

  if (!isDirectory(path)) {
    console.log(colors.red('The given path is not a directory.'));
    return;
  }
  const succeeded = store.updateProject(project.id, { id: project.id, path: path, scope: 'prx' });
  if (succeeded) {
    console.log(colors.green('Project updated.'));
  } else {
    console.log(colors.red('The project does not exist.'));
  }
}
