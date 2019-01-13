import * as fs from 'fs';
import * as path from 'path';

export function getDirectories(basePath: string) {
  return fs
    .readdirSync(basePath)
    .filter(file => isDirectory(path.join(basePath, file)))
    .sort();
}

export function isDirectory(basePath: string) {
  const stats = fs.lstatSync(basePath);
  if (stats.isSymbolicLink()) {
    return false;
  }
  const isDir = stats.isDirectory();
  const isNotFile = path.basename(basePath).indexOf('.') !== 0;
  return isDir && isNotFile;
}
