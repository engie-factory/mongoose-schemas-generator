import File from './File';

class Swagger extends File {
  constructor(path) {
    super(path);

    this.getDocProperty = property => new Promise((resolve, reject) => {
      try {
        this.read()
          .then((content) => {
            resolve(JSON.parse(content)[property]);
          })
          .catch((err) => {
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

