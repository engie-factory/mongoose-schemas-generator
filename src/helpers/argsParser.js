const parseArg = (arg) => {
  const _arg = {};
  if (arg.indexOf('=') > -1) {
    const splitArg = arg.split('=');
    _arg[splitArg[0]] = splitArg[1];
  } else {
    _arg[arg] = true;
  }
  return _arg;
};

const parseArgs = args => new Promise((resolve, reject) => {
  try {
    let _args = {};
    args.forEach((val, index, array) => {
      const _arg = parseArg(val);
      _args = Object.assign(_args, _arg);
      if (index === array.length - 1) {
        resolve(_args);
      }
    });
  } catch (e) {
    reject(e);
  }
});

export {
  parseArg, // parse a single argument
  parseArgs // parse an arguments collection
};
