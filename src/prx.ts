#!/usr/bin/env node
import './libs/polyfills';
import * as app from 'commander';
import { store } from './libs';
import { listProjectsCommand, deleteProjectCommand, addProjectCommand, openProjectCommand } from './commands';

const { version, description } = require('../package.json');

app.version(version).description(description);

app
  .command('list')
  .alias('ls')
  .description('List all projects in workspace')
  .action(() => listProjectsCommand());

app
  .command('open')
  .alias('o')
  .description('Open project')
  .action(() => openProjectCommand());

app
  .command('add')
  .description('Add a project to the workspace')
  .action(() => addProjectCommand());

app
  .command('delete')
  .alias('del')
  .description('Remove a project from the workspace')
  .action(() => deleteProjectCommand());

app
  .command('settings')
  .description('Open the settings file')
  .action(() => store.openConfigInEditor());

app.parse(process.argv);

if (!app.args.length) {
  app.help();
}
