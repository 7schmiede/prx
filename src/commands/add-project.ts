import * as inquirer from 'inquirer';
import * as colors from 'colors';
import { store, isDirectory } from '../libs';

export function addProjectCommand() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Name of the project'
      },
      {
        type: 'input',
        name: 'path',
        message: 'Path of the project'
      }
    ])
    .then((answers: any) => {
      const { name, path } = answers;
      if (!isDirectory(path)) {
        console.log(colors.red('The given path is not a directory.'));
        return;
      }
      const succeeded = store.addProject(path, name);
      if (succeeded) {
        console.log(colors.green('Project added.'));
      } else {
        console.log(colors.red('The project already exists.'));
      }
    });
}
