import _ from 'lodash';
import { camelCase, upperFirst, pluralize } from '../helpers/stringer';
// import wrap from 'word-wrap';

const DEFINITIONS = {
  String: {
    lowercase: false,
    uppercase: false,
    trim: null,
    match: null,
    enum: null,
    minlength: null,
    maxlength: null
  },
  Number: {
    min: null,
    max: null
  },
  allTypes: {
    required: false, // boolean or function
    default: false, // boolean or function
    select: false, // boolean
    validate: null, // function
    get: null, // function
    set: null, // function
    unique: false,
    sparse: false
  },
  Date: {
    min: null,
    max: null,
    expires: null
  },
  ObjectId: {
    turnOn: false
  }
};

const TYPES = {
  string: 'String',
  integer: 'Number',
  number: 'Number',
  date: 'Date',
  buffer: 'Buffer',
  bool: 'Boolean',
  boolean: 'Boolean',
  mixed: 'Mixed',
  objectid: 'ObjectId',
  array: 'Array'
};

class Definition {
  constructor(definitions) {
    this.definitions = definitions;

    this.getDefaultAttr = type => Object.assign({}, DEFINITIONS[type], DEFINITIONS.allTypes);

    this.getAllOf = (array) => {
      const property = {};
      _.forEach(array, (value) => {
        if (value.$ref) {
          const refName = value.$ref.substring('#/definitions/'.length);
          Object.assign(property, this.getProperties(this.definitions[refName]));
        } else {
          Object.assign(property, this.getProperties(value));
        }
      });
      return property;
    };

    this.getMongooseType = (property) => {
      let type = TYPES[property.type];

      if (type == null) {
        // TODO: type error
      }

      if (type === 'String') {
        if (property.format) {
          const format = property.format;
          if (format === 'date' || format === 'date-time') {
            type = TYPES.date;
          } else if (format === 'binary') {
            type = TYPES.buffer;
          } else {
            // TODO: format error
          }
        }
      }
      return type;
    };

    this.getProperties = (definition) => {
      if (definition === null || definition === undefined) {
        return {};
      }

      const _definition = Object.assign({}, definition);

      const allOf = _definition.allOf;
      if (allOf) {
        return Object.assign({}, this.getAllOf(allOf));
      }

      const type = _definition.type;
      let property = null;

      if (type && typeof type !== 'object') {
        if (type === 'object') {
          if (_definition.required) { // add required attributes
            _.forEach(_definition.required, (value) => {
              _definition.properties[value].required = true;
            });
          }
          property = {};
          property = this.getProperties(_definition.properties);
        } else if (type === 'array') {
          property = [];
          const data = this.getProperties(_definition.items);
          property.push(data);
        } else { // String, objectId, number, integer, date
          property = {};
          property.type = this.getMongooseType(_definition);
          delete _definition.type;
          Object.assign(property, this.getDefaultAttr(property.type));
          _.forEach(_definition, (value, key) => {
            const _key = camelCase(key);
            property[_key] = value;
          });
        }
        return property;
      }

      property = {};
      _.forEach(_definition, (def, defName) => {
        if (defName === '$ref') {
          const refName = upperFirst(camelCase(def.substring('#/definitions/'.length)));
          property = { type: 'Schema.Types.ObjectId', ref: refName };
        } else {
          const _key = camelCase(defName);
          property[_key] = this.getProperties(def);
        }
      });
      return property;
    };
  }

  getSchemas() {
    const schemas = {};
    _.forEach(this.definitions, (definition, definitionName) => {
      const schema = {
        collection: pluralize(definitionName, { snakecase: true }),
        name: upperFirst(camelCase(definitionName)),
        properties: this.getProperties(definition)
      };
      schemas[schema.name] = schema;
    });
    return schemas;
  }
}
export default Definition;
