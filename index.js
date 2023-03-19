const Api = require('./Api.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (!Api.isPathValid(path)) {
      reject(`La ruta especificada no es valida: ${path}`);
    } else if (Api.isAbsolute(path)) {
      reject(`La ruta especificada no es relativa: ${path}`);
    } else if (!Api.isDirectory(path) && !Api.isFile(path)) {
      reject(`La ruta especificada no es un archivo: ${path}`);
    } else {
      const absolutePath = Api.toAbsolutePath(path);
      let mdFiles = [];
      if (Api.isDirectory(absolutePath)) {
        mdFiles = Api.mdFiles.searchFiles(absolutePath).map(file => path.join(absolutePath, file));
      } else {
        mdFiles = [absolutePath];
      }
      const links = [];
      mdFiles.forEach(mdFile => {
        const mdContent = Api.readMd(mdFile);
        const fileLinks = extractLinks(mdContent);
        fileLinks.forEach(link => {
          links.push({
            file: mdFile,
            text: link.text,
            href: link.href
          });
        });
      });
      resolve(links);
    }
  });
};

mdLinks('C:/Users/yilib/Documents/ProyectosLAB/DEV003-md-links/README.md').then((result) => {
  console.log(result);

})
  .catch((Error) => {
    console.log(Error)
  });

module.exports = { mdLinks };
