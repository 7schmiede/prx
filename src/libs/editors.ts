import { execSync, exec } from 'child_process';
import { hasExecutable } from './utils';
import { isWindows } from './utils';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

export type Editor = 'VS Code' | 'Explorer' | 'Visual Studio';

export function readEditors() {
  const editors: Editor[] = [];
  if (hasExplorer()) {
    editors.push('Explorer');
  }
  if (hasVsCode()) {
    editors.push('VS Code');
  }
  // if (hasVisualStudio()) {
  //   editors.push('Visual Studio');
  // }
  return editors;
}

export function openInEditor(editor: Editor, path: string) {
  switch (editor) {
    case 'Explorer':
      return openInExplorer(path);
    case 'VS Code':
      return openInVsCode(path);
    case 'Visual Studio':
      return openInVisualStudio(path);
    default:
      throw new Error(`Unknown editor: ${editor}`);
  }
}

function hasExplorer() {
  return isWindows();
}

function hasVsCode() {
  if (isWindows) {
    try {
      return execSync('code --version');
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}

function hasVisualStudio() {
  if (isWindows) {
    return hasExecutable('devenv', process.cwd());
  } else {
    return false;
  }
}

function openInExplorer(path: string) {
  if (isWindows) {
    exec(`start explorer ${path}`);
  }
}

function openInVsCode(path: string) {
  if (isWindows) {
    exec(`start code ${toWindows(path)}`);
  }
}

function openInVisualStudio(path: string) {
  if (isWindows) {
    if (!existsSync(path)) {
      return;
    }

    const files = readdirSync(path);
    const slnRegExp = new RegExp(`.*\.(sln)`, 'ig');
    const solutions = files.filter(file => file.match(slnRegExp));
    if (!solutions || solutions.length === 0) {
      return;
    }

    const solutionPath = join(path, solutions[0]);
    exec(`start devenv ${toWindows(solutionPath)}`);
  }
}

function toWindows(path: string): string {
  return path
    .split('/')
    .filter(p => !!p)
    .join('\\');
}
