# mongoose-schemas-generator
A mongoose schema generator from a swagger json file

Mongoose schemas generator from a swagger design file using ES6.

### Start ###

```bash
:~$ npm install
:~$ --in=/path/to/swagger/file.{yaml|json} out=/path/to/destination/folder node dist/index.js
```

### Test ###

```bash
:~$ npm test
# or
:~$ mocha --compilers js:babel-core/register
```

### Lint ###

```bash
:~$ npm run lint
```