import path from 'path';
import winston from 'winston';
import ModelGenerator from './generators/ModelGenerator';

const parseArg = (arg) => {
  const _arg = {};
  if (arg.indexOf('=') > -1) {
    const splitArg = arg.split('=');
    _arg[splitArg[0]] = splitArg[1];
  } else {
    _arg[arg] = true;
  }
  return _arg;
};

const parseArgs = args => new Promise((resolve, reject) => {
  try {
    let _args = {};
    args.forEach((val, index, array) => {
      const _arg = parseArg(val);
      _args = Object.assign(_args, _arg);
      if (index === array.length - 1) {
        resolve(_args);
      }
    });
  } catch (e) {
    reject(e);
  }
});

parseArgs(process.argv.slice(2))
  .then((args) => {
    if (args.in && args.out) {
      const inFile = path.resolve(__dirname, '.', args.in);
      const outFolder = path.resolve(__dirname, '.', args.out);
      const generator = new ModelGenerator(inFile);
      generator.generateSchemas(outFolder).then((res) => {
        if (res) {
          winston.log('info', 'Models are being created');
        }
      }).catch((err) => {
        winston.log('error', 'Error creating models', err);
      });
    } else {
      throw new Error('No minimal arguments passed');
    }
  })
  .catch((err) => {
    winston.log('error', err);
  });
