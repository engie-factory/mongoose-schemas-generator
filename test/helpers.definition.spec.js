import { expect } from 'chai';
import _ from 'lodash';
import path from 'path';
import Swagger from '../src/structs/Swagger';
import Definition from '../src/structs/Definition';
import ModelGenerator from '../src/generators/ModelGenerator';
import File from '../src/structs/File';

const swagger = new Swagger(path.resolve(__dirname, './resources/swagger.json'));

describe('Definitions Test', () => {
  describe('Get definitions schemas', () => {
    it('Should get definitions schemas', (done) => {
      swagger.getDefinitions().then((definitions) => {
        const defs = new Definition(definitions);
        const schemas = defs.getSchemas();
        expect(schemas).to.be.an('object');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('Generate models', () => {
    it('Should generate schemas', (done) => {
      const generator = new ModelGenerator(path.resolve(__dirname, './resources/swagger.json'));
      generator.generateSchemas(path.resolve(__dirname, './resources/models')).then(() => {
        swagger.getDefinitions().then((definitions) => {
          if (definitions) {
            const defs = new Definition(definitions);
            const schemas = defs.getSchemas();
            let error = false;
            _.forEach(schemas, (schema) => {
              const file = new File(path.resolve(__dirname, `./resources/models/${schema.name}.js`));
              file.read().then((content) => {
                _.forEach(schema.properties, (property, key) => {
                  if (content.indexOf(key) === -1) error = true;
                  expect(error).to.be.equal(false);
                });
              }).catch((err) => {
                done(err);
              });
            });
          }
          done();
        }).catch((err) => {
          done(err);
        });
      }).catch((err) => {
        done(err);
      });
    });
  });
});
