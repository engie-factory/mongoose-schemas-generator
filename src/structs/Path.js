import _ from 'lodash';
import wrap from 'word-wrap';
import {
  camelCase,
  toLower,
  pluralize
} from '../helpers/stringer';

class Path {
  constructor(paths) {
    this.paths = paths;

    this.getOperationId = (methodName, pathName) => {
      if (pathName === '/' || pathName === '') return methodName;

      // clean url path for requests ending with '/'
      let cleanPath = pathName;
      if (cleanPath.indexOf('/', cleanPath.length - 1) !== -1) {
        cleanPath = cleanPath.substring(0, cleanPath.length - 1);
      }

      let segments = cleanPath.split('/').slice(1);
      segments = _.transform(segments, (result, segment) => {
        let _segment = segment;
        if (_segment[0] === '{' && _segment[_segment.length - 1] === '}') {
          _segment = `by-${_.capitalize(_segment.substring(1, _segment.length - 1))}}`;
        }
        result.push(_segment);
      });

      return camelCase(`${methodName.toLowerCase()}-${segments.join('-')}`);
    };

    this.getParameters = (parameters) => {
      const params = [];
      _.forEach(parameters, (parameter) => { // , paramName) => {
        if (parameter.$ref) {
          // TODO
          // console.log('parameter.$ref', parameter);
          // console.log('paramName', paramName);
        }
        if (_.result(parameter, 'schema.$ref')) {
          const definition = parameter.schema.$ref.substring('#/definitions/'.length);
          if (definition) {
            // parameter = _.assign(parameter, definition);
            // console.log('schema.ref', parameter);
            // console.log('paramName', paramName);
          }
        }
        params.push(parameter);
      });
      return params;
    };

    this.getControllerRef = (responses) => {
      const refs = [];
      _.forEach(responses, (response, responseCode) => {
        const ref = {};
        ref.code = responseCode;
        if (_.result(response, 'schema.$ref')) {
          const definition = response.schema.$ref.substring('#/definitions/'.length);
          if (definition) {
            ref.controller = definition;
          }
        } else if (_.result(response, 'schema.items.$ref')) {
          const definition = response.schema.items.$ref.substring('#/definitions/'.length);
          if (definition) {
            ref.controller = definition;
          }
        }
        refs.push(ref);
      });
      return refs;
    };

    this.getMethods = (path, pathName, structName) => {
      const authorizedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLIK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND'];
      const methods = [];
      _.forEach(path, (method, methodName) => {
        if (authorizedMethods.indexOf(methodName.toUpperCase()) === -1) return;

        const _method = {};
        _method.pathName = pathName;
        _method.structName = structName;
        _method.operationId = method.operationId || this.getOperationId(methodName, pathName);
        _method.methodName = methodName;
        _method.description =
          method.description ? wrap(method.description, { width: 60, indent: '' }).split(/\n/) : null;
        _method.tags = method['x-swagger-router-controller'] || method.tags || pathName.split('/')[1];
        _method.parameters =
          method.parameters ? this.getParameters(method.parameters) : null;
        _method.controllerRef = this.getControllerRef(method.responses);
        methods.push(_method);
      });
      return methods;
    };

    this.editPathName = (pathName) => {
      /* eslint-disable prefer-const */
      const splitPath = pathName.split('/');
      let cleanPath = splitPath.map((pathPart) => {
        if (pathPart.indexOf('-') !== -1 || pathPart.indexOf('_') !== -1) {
          const _pathPart = camelCase(pathPart);
          return `:${_pathPart}`;
        }
        return pathPart;
      });
      cleanPath.splice(1, 1);
      if (cleanPath.length === 1) {
        cleanPath[1] = '';
      }
      return cleanPath.join('/');
    };
    /* eslint-enable prefer-const */
  }

  getPaths() {
    const paths = {};
    _.forEach(this.paths, (path, pathName) => {
      const _path = {};
      const _pathName = this.editPathName(pathName.replace('}', '').replace('{', ':'));
      const endpointName = pathName.split('/')[1];
      _path.endpointName = endpointName;
      _path.routerName = pluralize(endpointName, { revert: true });
      _path.structName = pluralize(endpointName, { revert: true, camelcase: true });
      _path.listName = pluralize(endpointName, { camelcase: true });
      _path.controllerName = pluralize(endpointName, { revert: true });
      _path.modelName = pluralize(endpointName, { revert: true, upperfirst: true });
      _path.pathName = _pathName;
      _path.methods = this.getMethods(path, pathName, _path.structName);
      const tags = _.uniq(_.flatten(_.map(_path.methods, 'tags')));
      _.forEach(tags, (tag) => {
        const _tag = toLower(tag);
        if (!paths[_tag]) {
          paths[_tag] = [];
        }
        paths[_tag].push(_path);
      });
    });

    return paths;
  }
}
export default Path;
