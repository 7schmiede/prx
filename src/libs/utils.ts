import { execSync } from 'child_process';
import * as path from 'path';
import * as os from 'os';
import { existsSync } from 'fs';

export function isWindows() {
  return os.platform() === 'win32';
}

export function isLinux() {
  return os.platform() === 'darwin';
}

export function exists(command: string) {
  try {
    if (isWindows) {
      execSync(`where ${command}`).toString();
    } else {
      execSync(`which ${command}`).toString();
    }
    return true;
  } catch (e) {
    return false;
  }
}

export function findExecutable(command: string, cwd: string) {
  const paths = (process.env.PATH as string).split(path.delimiter);
  if (paths === void 0 || paths.length === 0) {
    return path.join(cwd, command);
  }
  const executable = findInPath(command, cwd, paths);
  return executable ? executable : path.join(cwd, command);
}

export function hasExecutable(command: string, cwd: string) {
  const paths = (process.env.PATH as string).split(path.delimiter);
  if (paths === void 0 || paths.length === 0) {
    return false;
  }
  return !!findInPath(command, cwd, paths);
}

function findInPath(command: string, cwd: string, paths: string[]) {
  for (const pathEntry in paths) {
    let fullPath: string;
    if (path.isAbsolute(pathEntry)) {
      fullPath = path.join(pathEntry, command);
    } else {
      fullPath = path.join(cwd, pathEntry, command);
    }

    if (existsSync(fullPath + '.exe')) {
      return fullPath + '.exe';
    } else if (existsSync(fullPath + '.cmd')) {
      return fullPath + '.cmd';
    } else if (existsSync(fullPath)) {
      return fullPath;
    }
  }
  return undefined;
}
