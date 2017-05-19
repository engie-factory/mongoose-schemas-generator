import YAML from 'yamljs';
import File from './File';

class Swagger extends File {
  constructor(path) {
    super(path);

    this.getDocProperty = property => new Promise((resolve, reject) => {
      try {
        this.read().then((content) => {
          if (this.path.indexOf('.yaml') > -1) {
            resolve(YAML.parse(content)[property]);
          } else if (this.path.indexOf('.json') > -1) {
            resolve(JSON.parse(content)[property]);
          } else {
            throw new Error('Unsupported file extention');
          }
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  getPaths() {
    return this.getDocProperty('paths');
  }

  getDefinitions() {
    return this.getDocProperty('definitions');
  }
}

export default Swagger;

