import handleBars from 'handlebars';
import path from 'path';
import _ from 'lodash';
import Definition from './Definition';
import File from './File';
import Swagger from './Swagger';

handleBars.registerHelper('json', (context) => {
  let _context = null;
  if (!(context instanceof Array)) {
    _context = Object.assign({}, context);
    if (_context.description) {
      delete _context.description;
    }
    if (_context.format) {
      delete _context.format;
    }
    if (_context.example) {
      delete _context.example;
    }
  } else {
    _context = context;
  }
  return JSON.stringify(_context, null, 4).replace(/"/g, '');
});

class ModelGenerator {
  constructor(swaggerPath, destinationPath) {
    this.swaggerPath = swaggerPath;
    this.destinationPath = destinationPath;
    this.generateSchema = (schema) => {
      const templateFile = new File(path.resolve(__dirname, '../templates/schema.jst'));

      templateFile.read().then((data) => {
        const targetFile = new File(path.resolve(__dirname, `../models/${schema.name}.js`));
        const template = handleBars.compile(data.toString());
        const content = template({
          schemaName: schema.name,
          properties: schema.properties,
          collectionName: schema.collection
        });

        targetFile.open(true).then((fd) => {
          targetFile.write(content)
            .then(() => {
              targetFile.close(fd).then(() => {})
                .catch((err) => {
                  throw err;
                });
            }).catch((err) => {
              throw err;
            });
        }).catch((err) => {
          throw err;
        });
      }).catch((err) => {
        throw err;
      });
    };
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
          this.generateSchema(schema);
        });
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

export default ModelGenerator;
