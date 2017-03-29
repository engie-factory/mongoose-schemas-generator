import handleBars from 'handlebars';

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
  json = json.replace(/ref: "([^"]+)"/g, 'ref: $1');
  json = json.replace(/"/g, '\'');
  return json;
});

export default handleBars;
