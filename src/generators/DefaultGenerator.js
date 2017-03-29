import path from 'path';
import handleBars from '../helpers/handlebars';
import File from '../helpers/File';

const generateFile = (object, pathFile, templateFileName) => {
  const templateFile = new File(path.resolve(__dirname, `../templates/${templateFileName}.jst`));

  templateFile.read().then((data) => {
    const targetFile = new File(path.resolve(__dirname, pathFile));
    const template = handleBars.compile(data.toString());
    const content = template(object);

    targetFile.open(true).then((fd) => {
      targetFile.write(content)
        .then(() => {
          targetFile.close(fd).then(() => {})
            .catch((err) => {
              throw err;
            });
        }).catch((err) => {
          throw err;
        });
    }).catch((err) => {
      throw err;
    });
  }).catch((err) => {
    throw err;
  });
};


export default generateFile;
