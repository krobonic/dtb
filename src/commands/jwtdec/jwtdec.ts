import { Argument, Command, Option } from 'commander';
import * as jwt from 'jsonwebtoken';
import { algorithms } from './consts.ts';

type Options = {
  secret?: string;
  algorithm?: string;
};

export const jwtdec = (): Command => {
  const command = new Command('jwtdec');

  command
    .description('Decode JWTs')
    .addArgument(new Argument('<jwt>', 'Encoded JWT'))
    .addOption(new Option('-s, --secret <secret>', 'Verify signature with secret'))
    .addOption(new Option('-a, --algorithm <algorithm>', 'Signature algorithm').choices(algorithms))
    .action((token, opts: Options) => {
      if (opts.secret) {
        let options: jwt.VerifyOptions = {};
        if (opts.algorithm) {
          options.algorithms = [opts.algorithm as jwt.Algorithm];
        }
        console.table(jwt.verify(token, opts.secret, options));
      } else {
        console.log(jwt.decode(token));
      }
    });
  return command;
};
