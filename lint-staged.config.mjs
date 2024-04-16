import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  concatFilesForPrettier,
  getEslintFixCmd,
} from './lint-staged.common.cjs';

/**
 * @type {Record<string, (filenames: string[]) => string | string[] | Promise<string | string[]>>}
 */
const rules = {
  '**/*.{js,jsx,ts,tsx,mjs,cjs}': (filenames) => {
    return getEslintFixCmd({
      cwd: dirname(fileURLToPath(import.meta.url)),
      fix: true,
      cache: true,
      // when autofixing staged-files a good tip is to disable react-hooks/exhaustive-deps, cause
      // a change here can potentially break things without proper visibility.
      rules: ['react-hooks/exhaustive-deps: off'],
      maxWarnings: 25,
      files: filenames,
    });
  },
  '**/*.{json,md,mdx,css,html,yml,yaml,scss}': (filenames) => {
    return [`prettier --write ${concatFilesForPrettier(filenames)}`];
  },
};

export default rules;
