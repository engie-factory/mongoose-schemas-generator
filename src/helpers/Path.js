import _ from 'lodash';
import wrap from 'word-wrap';

class Path {
  constructor(paths) {
    this.paths = paths;

    this.getParameters = (parameters) => {
      const params = [];
      _.forEach(parameters, (parameter) => {
        params.push(parameter.name);
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

    this.getMethods = (path) => {
      const authorizedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLIK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND'];
      const methods = [];
      _.forEach(path, (method, methodName) => {
        if (authorizedMethods.indexOf(methodName.toUpperCase()) === -1) return;

        const _method = {};
        _method.methodName = methodName;
        _method.description =
            method.description ?
            wrap(method.description, { width: 60, indent: '' }).split(/\n/) : null;
        _method.parameters =
            method.parameters ? this.getParameters(method.parameters) : null;
        _method.controllerRef = this.getControllerRef(method.responses);
        methods.push(_method);
      });
      return methods;
    };
  }

  getControllers() {
    const paths = [];
    _.forEach(this.paths, (path, pathName) => {
      const _path = {};
      _path.endpointName = pathName.split('/')[1];
      _path.route = pathName;
      _path.methods = this.getMethods(path);
      paths.push(_path);
    });
    return paths;
  }
}
export default Path;
