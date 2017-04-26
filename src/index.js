import path from 'path';
import winston from 'winston';
import ModelGenerator from './generators/ModelGenerator';
import RouterGenerator from './generators/RouterGenerator';
import ControllerGenerator from './generators/ControllerGenerator';
import { parseArgs } from './helpers/argsParser';


parseArgs(process.argv.slice(2))
  .then((args) => {
    if (args.in && args.out) {
      const inFile = path.resolve(__dirname, '.', args.in);
      const outFolder = path.resolve(__dirname, '.', args.out);
      const modelGenerator = new ModelGenerator(inFile);
      const routerGenerator = new RouterGenerator(inFile);
      const controllerGenerator = new ControllerGenerator(inFile);
      const none = !args.models && !args.all && !args.routes && !args.controllers;
      const all = (args.models && args.controllers && args.routes) || args.all;
      if (args.models || all || none) {
        modelGenerator.generateSchemas(outFolder).then((res) => {
          if (res) {
            winston.log('info', 'Models are being created');
          }
        }).catch((err) => {
          winston.log('error', 'Error creating models', err);
        });
      }
      if (args.routes || all || none) {
        routerGenerator.generateRoutes(outFolder).then((res) => {
          if (res) {
            winston.log('info', 'Routes are being created');
          }
        }).catch((err) => {
          winston.log('error', 'Error creating routes', err);
        });
      }
      if (args.controllers || all || none) {
        controllerGenerator.generateControllers(outFolder).then((res) => {
          if (res) {
            winston.log('info', 'Controllers are being created');
          }
        }).catch((err) => {
          winston.log('error', 'Error creating controllers', err);
        });
      }
    } else {
      throw new Error('No minimal arguments passed');
    }
  })
  .catch((err) => {
    winston.log('error', err);
  });
