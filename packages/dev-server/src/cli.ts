#!/usr/bin/env node
import { cac } from 'cac';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import pc from 'picocolors';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const cli = cac('solidjs-email');

cli
  .command('dev', 'Start the development server')
  .option('--dir <dir>', 'Path to emails directory', { default: './emails' })
  .option('--port <port>', 'Port to run the server on', { default: 6008 })
  .action(async (options) => {
    const emailsDir = resolve(process.cwd(), options.dir as string);
    const port = Number(options.port);

    console.log(pc.cyan('\n  solidjs-email dev server\n'));
    console.log(`  ${pc.dim('Emails directory:')} ${emailsDir}`);
    console.log(`  ${pc.dim('Port:')} ${port}\n`);

    process.env.EMAILS_DIR = emailsDir;
    process.env.PORT = String(port);

    const vinxiPath = resolve(__dirname, '..', 'node_modules', '.bin', 'vinxi');
    const appConfigPath = resolve(__dirname, '..');

    const child = spawn(vinxiPath, ['dev', '--port', String(port)], {
      cwd: appConfigPath,
      stdio: 'inherit',
      env: {
        ...process.env,
        EMAILS_DIR: emailsDir,
        PORT: String(port),
      },
      shell: true,
    });

    child.on('error', (err) => {
      console.error(pc.red('Failed to start dev server:'), err);
      process.exit(1);
    });

    child.on('exit', (code) => {
      process.exit(code ?? 0);
    });
  });

cli
  .command('', 'Start the development server (default)')
  .option('--dir <dir>', 'Path to emails directory', { default: './emails' })
  .option('--port <port>', 'Port to run the server on', { default: 6008 })
  .action(async (options) => {
    const emailsDir = resolve(process.cwd(), options.dir as string);
    const port = Number(options.port);

    console.log(pc.cyan('\n  solidjs-email dev server\n'));
    console.log(`  ${pc.dim('Emails directory:')} ${emailsDir}`);
    console.log(`  ${pc.dim('Port:')} ${port}\n`);

    process.env.EMAILS_DIR = emailsDir;
    process.env.PORT = String(port);

    const vinxiPath = resolve(__dirname, '..', 'node_modules', '.bin', 'vinxi');
    const appConfigPath = resolve(__dirname, '..');

    const child = spawn(vinxiPath, ['dev', '--port', String(port)], {
      cwd: appConfigPath,
      stdio: 'inherit',
      env: {
        ...process.env,
        EMAILS_DIR: emailsDir,
        PORT: String(port),
      },
      shell: true,
    });

    child.on('error', (err) => {
      console.error(pc.red('Failed to start dev server:'), err);
      process.exit(1);
    });

    child.on('exit', (code) => {
      process.exit(code ?? 0);
    });
  });

cli.help();
cli.version('1.0.0');

cli.parse();
