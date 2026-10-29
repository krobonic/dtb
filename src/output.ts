import YAML from 'yaml';

export type Output = 'default' | 'json' | 'yaml' | 'table';
export const outputTypes: Output[] = ['default', 'json', 'yaml', 'table'];

export const output = (data: any, outputType: Output = 'default'): void => {
  switch (outputType) {
    case 'json':
      console.log(JSON.stringify(data, null, 2));
      break;

    case 'yaml':
      console.log(YAML.stringify(data).trimEnd());
      break;

    case 'table':
      console.table(data);
      break;

    default:
      console.dir(data, {
        depth: null,
        colors: Boolean(process.stdout.isTTY),
      });
  }
};
