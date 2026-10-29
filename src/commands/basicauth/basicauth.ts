import { Command, Option } from 'commander';
import { output } from '../../output.ts';
import type { GlobalOptions } from '../../types.ts';

type Options = {
  username: string;
  password: string;
};

export const basicAuth = (): Command => {
  const cmd = new Command('basicauth');

  cmd
    .alias('ba')
    .description('Generate Authorization header with basic auth credentials')
    .addOption(new Option('-u, --username <username>', 'Username').makeOptionMandatory())
    .addOption(new Option('-p, --password <password>', 'Password').makeOptionMandatory())
    .action((_opts: Options, command) => {
      const opts = command.optsWithGlobals() as Options & GlobalOptions;
      const { username, password } = opts;
      const credentials = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

      output(`Basic ${credentials}`, opts.output);
    });
  return cmd;
};
