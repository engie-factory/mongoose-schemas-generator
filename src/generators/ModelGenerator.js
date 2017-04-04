import _ from 'lodash';
import $ from 'shelljs';
import winston from 'winston';
import Definition from '../structs/Definition';
import Swagger from '../structs/Swagger';
import generateFile from './DefaultGenerator';

class ModelGenerator {
  constructor(swaggerPath) {
    this.swaggerPath = swaggerPath;
  }

  generateSchemas(folderPath) {
    $.mkdir('-p', folderPath);
    return new Promise((resolve, reject) => {
      const swagger = new Swagger(this.swaggerPath);
      swagger.getDefinitions()
        .then((definitions) => {
          if (!definitions) {
            reject(new Error('No definitions found'));
          } else {
            const defs = new Definition(definitions);
            const schemas = defs.getSchemas();
            _.forEach(schemas, (schema) => {
              const pathFile = `${folderPath}/${schema.name}.js`;
              const templateFile = 'schema';
              const content = {
                schemaName: schema.name,
                properties: schema.properties,
                collectionName: schema.collection
              };
              generateFile(content, pathFile, templateFile).then(() => {
                winston.log('info', `Model ${schema.name} generated in file ${pathFile}`);
              }).catch((err) => {
                winston.log('error', 'Error genarating file', err);
              });
            });
            resolve(true);
          }
        }).catch(reject);
    });
  }
}

export default ModelGenerator;
