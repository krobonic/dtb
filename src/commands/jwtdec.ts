import { Argument, Command, Option } from 'commander';
import * as jwt from 'jsonwebtoken';

type Options = {
  secret?: string;
  algorithm?: string;
};

const algorithmns: jwt.Algorithm[] = [
  'HS256',
  'HS384',
  'HS512',
  'RS256',
  'RS384',
  'RS512',
  'ES256',
  'ES384',
  'ES512',
  'PS256',
  'PS384',
  'PS512',
  'none',
];
export const jwtdec = (): Command => {
  const command = new Command('jwtdec');

  command
    .description('Decode JWTs')
    .addArgument(new Argument('<jwt>', 'Encoded JWT'))
    .addOption(new Option('-s, --secret <secret>', 'Verify signature with secret'))
    .addOption(new Option('-a, --algorithm <algorithm>', 'Signature algorithmn').choices(algorithmns))
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
