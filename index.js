const Api = require('./Api.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    const absolutePath = convertToAbsolutePath(path);
    if (!isPathValid(absolutePath)) {
      reject(new Error('La ruta especificada no es válida'));
    } else if (isFile(absolutePath)) {
      const mdContent = readMd(absolutePath);
      const links = extractLinks(absolutePath, mdContent);
      resolve(links);
    } else if (isDirectory(absolutePath)) {
      const mdFilesArr = mdFiles(absolutePath);
      const allLinksArr = mdFilesArr.map(mdFile => {
        const mdFilePath = path.join(absolutePath, mdFile);
        const mdContent = readMd(mdFilePath);
        return extractLinks(mdFilePath, mdContent);
      });
      const allLinks = [].concat(...allLinksArr);
      resolve(allLinks);
    }
  });
};

module.exports = { mdLinks };
mdLinks('README.txt').then((result) => {
  console.log(result);

})
  .catch((Error) => {
    console.log(Error)
  });