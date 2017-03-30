import path from 'path';
import handleBars from '../helpers/handlebars';
import File from '../structs/File';

const generateFile = (object, pathFile, templateFileName) => new Promise((resolve, reject) => {
  const templateFile = new File(path.resolve(__dirname, `../templates/${templateFileName}.jst`));

  templateFile.read().then((data) => {
    const targetFile = new File(path.resolve(pathFile));
    const template = handleBars.compile(data.toString());
    const content = template(object);

    targetFile.open(true).then((fd) => {
      targetFile.write(content)
        .then(() => {
          targetFile.close(fd)
            .then(() => {
              resolve(true);
            })
            .catch(reject);
        }).catch(reject);
    }).catch(reject);
  }).catch(reject);
});


export default generateFile;
