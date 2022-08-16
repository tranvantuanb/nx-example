import * as ts from 'typescript';
import { Schema } from './schema';

import {
  applyChangesToString,
  convertNxGenerator,
  formatFiles,
  generateFiles,
  GeneratorCallback,
  getProjects,
  joinPathFragments,
  logger,
  names,
  Tree,
} from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { addExport } from '../../utils/ast-utils';

interface NormalizedSchema extends Schema {
  projectSourceRoot: string;
  fileName: string;
  fileRelativePath: string;
}

export async function componentGenerator(host: Tree, schema: Schema) {
  const options = await normalizeOptions(host, schema);
  createComponentFiles(host, options);

  const tasks: GeneratorCallback[] = [];

  addExportsToBarrel(host, options);

  await formatFiles(host);

  return runTasksInSerial(...tasks);
}

function createComponentFiles(host: Tree, options: NormalizedSchema) {
  const componentDir = joinPathFragments(
    options.projectSourceRoot,
    options.directory
  );

  generateFiles(host, joinPathFragments(__dirname, './files'), componentDir, {
    ...options,
    tmpl: '',
  });
}

function addExportsToBarrel(host: Tree, options: NormalizedSchema) {
  const workspace = getProjects(host);
  const isApp = workspace.get(options.project).projectType === 'application';

  if (options.export && !isApp) {
    const indexFilePath = joinPathFragments(
      options.projectSourceRoot,
      'components/index.ts'
    );
    const indexSource = host.read(indexFilePath, 'utf-8');
    if (indexSource !== null) {
      const indexSourceFile = ts.createSourceFile(
        indexFilePath,
        indexSource,
        ts.ScriptTarget.Latest,
        true
      );

      const changes = applyChangesToString(
        indexSource,
        addExport(
          indexSourceFile,
          `export * from './${options.fileRelativePath}/${options.fileName}';`
        )
      );
      host.write(indexFilePath, changes);
    }
  }
}

async function normalizeOptions(
  host: Tree,
  options: Schema
): Promise<NormalizedSchema> {
  assertValidOptions(options);

  const { className: fileName } = names(options.name);
  const project = getProjects(host).get(options.project);

  if (!project) {
    logger.error(
      `Cannot find the ${options.project} project. Please double check the project name.`
    );
    throw new Error();
  }

  const { sourceRoot: projectSourceRoot, projectType } = project;

  const { directory, fileRelativePath } = await getDirectory(host, options);

  if (options.export && projectType === 'application') {
    logger.warn(
      `The "--export" option should not be used with applications and will do nothing.`
    );
  }

  return {
    ...options,
    directory,
    fileRelativePath,
    fileName,
    projectSourceRoot,
  };
}

async function getDirectory(host: Tree, options: Schema) {
  const { className: fileName } = names(options.name);
  const baseDir = 'components';

  const fileRelativePath = options.directory
    ? joinPathFragments(options.directory, fileName)
    : fileName;

  const directory = joinPathFragments(baseDir, fileRelativePath);
  return { directory, fileRelativePath };
}

function assertValidOptions(options: Schema) {
  const slashes = ['/', '\\'];
  slashes.forEach((s) => {
    if (options.name.indexOf(s) !== -1) {
      const [name, ...rest] = options.name.split(s).reverse();
      let suggestion = rest.map((x) => x.toLowerCase()).join(s);
      if (options.directory) {
        suggestion = `${options.directory}${s}${suggestion}`;
      }
      throw new Error(
        `Found "${s}" in the component name. Did you mean to use the --directory option (e.g. \`nx g c ${name} --directory ${suggestion}\`)?`
      );
    }
  });
}

export default componentGenerator;

export const componentSchematic = convertNxGenerator(componentGenerator);
