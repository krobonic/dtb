import { Command, Option } from 'commander';
import { output } from '../../output.ts';
import type { GlobalOptions } from '../../types.ts';

type Options = {
  password: string;
  algorithm: 'argon2id' | 'bcrypt';
};

export const passhash = (): Command => {
  const cmd = new Command('passhash');

  cmd
    .alias('ph')
    .description('Generate a salted password hash')
    .addOption(new Option('-p, --password <password>', 'Password').makeOptionMandatory())
    .addOption(new Option('-a, --algorithm <algorithm>', 'Hashing algorithm').choices(['argon2id', 'bcrypt']).default('argon2id'))
    .action(async (_opts: Options, command) => {
      const opts = command.optsWithGlobals() as Options & GlobalOptions;
      const hash = await Bun.password.hash(opts.password, { algorithm: opts.algorithm });

      output(hash, opts.output);
    });
  return cmd;
};
