import _ from 'lodash';
import wrap from 'word-wrap';
import { camelCase } from '../helpers/stringer';

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

    this.getMethods = (path, pathName) => {
      const authorizedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLIK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND'];
      const methods = [];
      _.forEach(path, (method, methodName) => {
        if (authorizedMethods.indexOf(methodName.toUpperCase()) === -1) return;

        const _method = {};
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
  }

  getPaths() {
    // const paths = {};
    const routes = [];
    _.forEach(this.paths, (methods, path) => {
      const route = {
        path,
        methods: []
      };
      _.forEach(methods, (method, verb) => {
        route.methods.push({
          verb,
          summary: method.summary,
          description: method.description,
          parameters: method.parameters
          // tags: method.tags
          // responses: method.responses
        });
      });
      routes.push(route);
    });
    return routes;
  }
}
export default Path;
