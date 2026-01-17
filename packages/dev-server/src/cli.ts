#!/usr/bin/env node
import { cac } from 'cac';
import { startDevServer } from './server/dev-server';

const cli = cac('solidjs-email');

cli
  .command('dev', 'Start the development server')
  .option('--dir <dir>', 'Path to emails directory', { default: './emails' })
  .option('--port <port>', 'Port to run the server on', { default: 3000 })
  .action(async (options) => {
    const dir = options.dir as string;
    const port = Number(options.port);
    await startDevServer({ emailsDir: dir, port });
  });

cli
  .command('', 'Start the development server (default)')
  .option('--dir <dir>', 'Path to emails directory', { default: './emails' })
  .option('--port <port>', 'Port to run the server on', { default: 3000 })
  .action(async (options) => {
    const dir = options.dir as string;
    const port = Number(options.port);
    await startDevServer({ emailsDir: dir, port });
  });

cli.help();
cli.version('0.0.1');

cli.parse();
