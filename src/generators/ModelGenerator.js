import _ from 'lodash';
import Definition from '../helpers/Definition';
import Swagger from '../helpers/Swagger';
import generateFile from './DefaultGenerator';

class ModelGenerator {
  constructor(swaggerPath) {
    this.swaggerPath = swaggerPath;
  }

  generateSchemas() {
    return new Promise((resolve, reject) => {
      const swagger = new Swagger(this.swaggerPath);

      swagger.getDefinitions().then((definitions) => {
        if (!definitions) {
          resolve(false);
        }
        const defs = new Definition(definitions);
        const schemas = defs.getSchemas();
        _.forEach(schemas, (schema) => {

          const pathFile = `../models/${schema.name}.js`;
          const templateFile = 'schema';
          const content = {
            schemaName: schema.name,
            properties: schema.properties,
            collectionName: schema.collection
          }
          
          generateFile(content, pathFile, templateFile);
        });
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

export default ModelGenerator;
