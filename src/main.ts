import { Command, Option } from 'commander';
import { version } from '../package.json';
import { jwtdec } from './commands/jwtdec/jwtdec.ts';
import { outputTypes } from './output.ts';
import { basicAuth } from './commands/basicauth/basicauth.ts';

const program = new Command();

program
  .name('dtb')
  .description('A CLI with useful utilities for developers')
  .addOption(new Option('-o, --output <output>', 'Output format').choices(outputTypes))
  .version('v' + version, '-v, --version')
  .addCommand(jwtdec())
  .addCommand(basicAuth())
  .parse();
