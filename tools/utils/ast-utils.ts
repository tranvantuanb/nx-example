import * as ts from 'typescript';
import { findNodes } from '@nrwl/workspace/src/utilities/typescript/find-nodes';
import { ChangeType, StringChange } from '@nrwl/devkit';

export function addExport(
  source: ts.SourceFile,
  statement: string
): StringChange[] {
  const allExports = findNodes(source, ts.SyntaxKind.ExportDeclaration);
  if (allExports.length > 0) {
    const lastExport = allExports[allExports.length - 1];
    return [
      {
        type: ChangeType.Insert,
        index: lastExport.end,
        text: `\n${statement}\n`,
      },
    ];
  } else {
    return [
      {
        type: ChangeType.Insert,
        index: 0,
        text: `\n${statement}\n`,
      },
    ];
  }
}
