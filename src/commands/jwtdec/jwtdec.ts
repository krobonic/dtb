import { Argument, Command, Option } from 'commander';
import * as jwt from 'jsonwebtoken';
import { algorithms } from './consts.ts';
import { output } from '../../output.ts';
import type { GlobalOptions } from '../../types.ts';

type Options = {
  secret?: string;
  algorithm?: string;
};

export const jwtdec = (): Command => {
  const cmd = new Command('jwtdec');

  cmd
    .description('Decode JWTs')
    .addArgument(new Argument('<jwt>', 'Encoded JWT'))
    .addOption(new Option('-s, --secret <secret>', 'Verify signature with secret'))
    .addOption(new Option('-a, --algorithm <algorithm>', 'Signature algorithm').choices(algorithms))
    .action((token, _opts: Options, command) => {
      const opts = command.optsWithGlobals() as Options & GlobalOptions;

      if (opts.secret) {
        const options: jwt.VerifyOptions = { complete: true };
        if (opts.algorithm) {
          options.algorithms = [opts.algorithm as jwt.Algorithm];
        }
        output(jwt.verify(token, opts.secret, options), opts.output);
      } else {
        output(jwt.decode(token, { complete: true }), opts.output);
      }
    });
  return cmd;
};
