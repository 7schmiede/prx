import * as os from 'os';
import { execSync, exec } from 'child_process';

export type Editor = 'VS Code' | 'Explorer';

export function openInEditor(editor: Editor, path: string) {
  switch (editor) {
    case 'Explorer':
      return openInExplorer(path);
    case 'VS Code':
      return openInVsCode(path);
    default:
      throw new Error(`Unknown editor: ${editor}`);
  }
}

function isWindows() {
  return os.platform() === 'win32';
}

function isLinux() {
  return os.platform() === 'darwin';
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

function toWindows(path: string): string {
  return path
    .split('/')
    .filter(p => !!p)
    .join('\\');
}
