import { Command } from 'commander';
import { version } from '../package.json';
import { jwtdec } from './commands/jwtdec/jwtdec.ts';

const program = new Command();

program
  .name('Dev Tool Box')
  .description('A CLI with useful utilities for developers')
  .version('v' + version, '-v, --version')
  .addCommand(jwtdec())
  .parse();
