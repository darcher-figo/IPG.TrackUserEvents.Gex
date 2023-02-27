/* eslint-disable no-await-in-loop, no-restricted-syntax */
import type { ExecaChildProcess, Options } from 'execa';
import chalk from 'chalk';

const logger = console;

type StepOptions = Partial<{
  startMessage: string;
  errorMessage: string;
  dryRun: boolean;
  debug: boolean;
  signal: AbortSignal;
}>;

// Note this is to fool `ts-node` into not turning the `import()` into a `require()`.
// See: https://github.com/TypeStrong/ts-node/discussions/1290
// eslint-disable-next-line @typescript-eslint/no-implied-eval
const dynamicImport = new Function('specifier', 'return import(specifier)');
export const getExeca = async () => (await dynamicImport('execa')) as typeof import('execa');

// Reimplementation of `execaCommand` to use `getExeca`
export const execaCommand = async (
  command: string,
  options: Options = {}
): Promise<ExecaChildProcess<string>> => {
  const execa = await getExeca();
  // We await here because execaCommand returns a promise, but that's not what the user expects
  // eslint-disable-next-line @typescript-eslint/return-await
  return await execa.command(command, options);
};

export const exec = async (
  command: string | string[],
  options: Options = {},
  args: StepOptions = {}
): Promise<void> => {
  const { startMessage, errorMessage, dryRun, debug, signal } = args;
  const execa = await getExeca();
  logger.info();
  if (startMessage) logger.info(startMessage);

  if (dryRun) {
    logger.info(`\n> ${command}\n`);
    return undefined;
  }

  const defaultOptions: Options & { signal?: AbortSignal } = {
    shell: true,
    stdout: debug ? 'inherit' : 'pipe',
    stderr: debug ? 'inherit' : 'pipe',
    signal,
  };
  let currentChild: ExecaChildProcess<string>;

  try {
    if (typeof command === 'string') {
      logger.debug(`> ${command}`);
      currentChild = execa.command(command, { ...defaultOptions, ...options });
      await currentChild;
    } else {
      for (const subcommand of command) {
        logger.debug(`> ${subcommand}`);
        currentChild = execa.command(subcommand, { ...defaultOptions, ...options });
        await currentChild;
      }
    }
  } catch (err: any) {
    if (!err.killed) {
      logger.error(chalk.red(`An error occurred while executing: \`${command}\``));
      logger.log(`${errorMessage}\n`);
    }

    throw err;
  }

  return undefined;
};