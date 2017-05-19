import handleBars from 'handlebars';
import _ from 'lodash';

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
  let json = JSON.stringify(_context, null, 4);
  json = json.replace(/"([^"]+)":/g, '$1:').replace(/\uFFFF/g, '\\"');
  json = json.replace(/type: "(Date|String|Number|Buffer|Boolean|Array|Mixed|ObjectId|Schema.Types.ObjectId)"/g, 'type: $1');
  json = json.replace(/ref: '([^'"]+)'/g, 'ref: $1');
  json = json.replace(/"/g, "'");
  return json;
});

handleBars.registerHelper('upperCase', context => _.upperCase(context));

handleBars.registerHelper('isRoot', (context, options) => {
  if (context === '/') {
    return options.fn();
  }
  return options.inverse();
});

handleBars.registerHelper('isRootId', (context, options) => {
  const _parts = context.split('/');
  if ((_parts.length === 2) && (_parts[1].indexOf(':') !== -1)) {
    return options.fn();
  }
  return options.inverse();
});

handleBars.registerHelper('process', (context, props) => {
  let _props = '';
  let _expect = '';
  _.forEach(props, (prop, propName) => {
    _props = `${_props}${propName}: ;//WRITE A NEW VALUE FOR THIS PROP
          `;
    _expect = `${_expect}expect(res.body.${propName}).to.equal(${context.structName}.${propName});
          `;
  });
  switch (context.methodName) {
    case 'get':
      return `it('showld get all ${context.tags}', (done) => {
      request(app)
        .get('/api${context.pathName}')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });`;
    case 'post':
      return `it('should create a new ${context.structName}', (done) => {
      request(app)
        .post('/api${context.pathName}')
        .send(${context.structName})
        .expect(httpStatus.OK)
        .then((res) => {
          ${_expect}${context.structName} = res.body;
          done();
        })
        .catch(done);
      });`;
    default:
      return null;
  }
});

handleBars.registerHelper('process2', (context, props) => {
  let _props = '';
  let _expect = '';
  _.forEach(props, (prop, propName) => {
    _props = `${_props}${propName}: ;//WRITE A NEW VALUE FOR THIS PROP
      `;
    _expect = `${_expect}expect(res.body.${propName}).to.equal(${context.structName}.${propName});
          `;
  });
  /* eslint-disable no-useless-concat */
  switch (context.methodName) {
    case 'get':
      return `it('showld get a ${context.structName} by Id', (done) => {
      request(app)
        .get(\`/api/${context.tags}/` + '${' + `${context.structName}._id}\`)
        .expect(httpStatus.OK)
        .then((res) => {
          ${_expect}done();
        })
        .catch(done);
    });

    it('showld get Not Found when ${context.structName} not exists', (done) => {
      request(app)
        .get('/api/${context.tags}/56c787ccc67fc16ccc1a5e92')
        .set('Authorization', token)
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message)
            .to.equal('Not Found');
          done();
        })
        .catch(done);
    });`;
    case 'put':
      return `it('showld update ${context.structName}', (done) => {
      ${_props}request(app)
        .put(\`/api/${context.tags}/` + '${' + `${context.structName}._id}\`)
        .send(${context.structName})
        .expect(httpStatus.OK)
        .then((res) => {
          ${_expect}done();
        })
        .catch(done);
    });`;
    case 'delete':
      return `it('showld delete ${context.structName}', (done) => {
      request(app)
        .delete(\`/api/${context.tags}/` + '${' + `${context.structName}._id}\`)
        .expect(httpStatus.OK)
        .then((res) => {
          ${_expect}done();
        })
        .catch(done);
    });`;
    default:
      return null;
  }
  /* eslint-enable no-useless-concat */
});

export default handleBars;
