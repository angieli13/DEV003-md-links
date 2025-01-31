#!/usr/bin/env node
const { mdLinks } = require('./index');
const {
  totalLinks, uniqueLinks, brokenLinks,
} = require('./Api.js');
const process = require('process');
var colors = require('colors/safe');
const emoji = require('node-emoji');
const argv = process.argv;//Asigna los argumentos de línea de comando
const path = process.argv[2];
//console.log(process.argv)


function cli() {
  const validate = argv.includes('--validate') || argv.includes('--v');
  const stats = argv.includes('--stats') || argv.includes('--s');
  const all = argv.includes('--all');
  const help = argv.includes('--help') || argv.includes('--h');


  if (path === undefined || path === "--help" || path === "--h") {
    console.log((colors.rainbow('\n-----------------------------------------------------------------------------------\n                    Welcome to md-links-angieli')) + "👩🏻‍💻" + (colors.rainbow('\n-----------------------------------------------------------------------------------\n')));
    console.log(colors.bgMagenta('\n🔎Instructions:'));
    console.log(colors.magenta('1.') + colors.white(' A valid path right after') + colors.blue('  md-links.'));
    console.log(colors.magenta('2.') + colors.white(' To see links route, url, status message, status number and text, write') + colors.blue('  --validate') + colors.white(' or') + colors.blue('  --v') + colors.white(' right after your path.'));
    console.log(colors.magenta('3.') + colors.white(' To see total links number and unique links number, write ') + colors.blue('  --stats') + colors.white(' or') + colors.blue('  --s') + colors.white(' right after your path.'));
    console.log(colors.magenta('4.') + colors.white(' To additionally see broken links number, add') + colors.blue('  --stats --validate') + colors.white(' or') + colors.blue('  --s --v') + colors.white(' right after your path.'));
    console.log(colors.magenta('5.') + colors.white(' To see the information of all your links, you must type') + colors.blue('  --all') + colors.white(' , after the path.'));     
    console.log(colors.magenta('6.') + colors.white(' To see these instructions again, you can type') + colors.blue('  --help') + colors.white('  or') + colors.blue('  --h') + colors.white(' right after') + colors.blue(' md-links.'));
    console.log(colors.rainbow('==================================================================================================================================='));

    process.exit(0);//para salir de la aplicación con éxito.
  }
  else if ((stats && validate) || (validate && stats)) {
    return mdLinks(path, { validate: validate, stats }).then((links) => {
      console.log(colors.rainbow('\nSTATS OF THE LINKS FOUND IN PATH' + emoji.emojify(' ⛓️✅:')));
      console.log(colors.bgMagenta('\nTOTAL LINKS  :') + (colors.bgBlue(totalLinks(links))));
      console.log(colors.bgMagenta('\nUNIQUE LINKS :') + (colors.bgBlue(uniqueLinks(links))));
      console.log(colors.bgMagenta('\nBROKEN LINKS :') + (colors.bgBlue(brokenLinks(links))));
      console.log((colors.rainbow('\n================================= md-links-angieli')) + "👩🏻‍💻" + (colors.rainbow('=================================')));
      process.exit(0);//para salir de la aplicación con éxito.
    }).catch((error) => { console.log(error); })

  } else if (stats && !validate) {
    return mdLinks(path, { validate: stats }).then((links) => {
      console.log(colors.rainbow('\nSTATS OF THE LINKS FOUND IN PATH' + emoji.emojify(' ⛓️✅:')));
      console.log(colors.bgMagenta('\nTOTAL LINKS  :') + (colors.bgBlue(totalLinks(links))));
      console.log(colors.bgMagenta('\nUNIQUE LINKS :') + (colors.bgBlue(uniqueLinks(links))));
      console.log((colors.rainbow('\n================================= md-links-angieli')) + "👩🏻‍💻" + (colors.rainbow('=================================')));
      process.exit(0);
    }).catch((error) => { console.log(error); })

  }
  else if (!stats && validate) {
    return mdLinks(path, { validate: validate }).then((links) => {
      console.log(colors.rainbow('\nALL VALIDATED LINKS FOUND IN PATH' + emoji.emojify(' ⛓️❌:')));
      const brokenLinks = links.filter(link => link.statusText !== 'OK');
      if (brokenLinks.length > 0) {
        console.log(colors.red('\nBROKEN LINKS:') + (colors.bgRed('  ' + brokenLinks.length)));
        brokenLinks.forEach(link => {
          console.log((colors.zebra('\n**************************************************************************************')));
          console.log(colors.bgMagenta('\nHREF :') + (colors.bgBlue(link.href)));
          console.log(colors.bgMagenta('\nFILE :') + (colors.bgBlue(link.file)));
          console.log(colors.bgMagenta('\nSTATUS :') + (colors.bgRed(link.status)));
          console.log(colors.bgMagenta('\nTEXT :') + (colors.bgBlue(link.text)));

        });
        console.log((colors.rainbow('\n================================= md-links-angieli')) + "👩🏻‍💻" + (colors.rainbow('=================================')));
        process.exit(1);
      } else {
        console.log(colors.bgGreen('All links work correctly.'));
        console.log((colors.rainbow('\n================================= md-links-angieli')) + "👩🏻‍💻" + (colors.rainbow('=================================')));
        process.exit(0);
      }
    }).catch((error) => { console.log(error); })
  } else if (all) {
    return mdLinks(path, { validate: all }).then((object) => {
      console.log(colors.rainbow('\nALL LINKS FOUND IN PATH' + " ✅"));
      for (let i = 0; i < object.length; i++) {        
        console.log(colors.bgMagenta('\nHREF  :', object[i].href));
        console.log('TEXT    :', object[i].text);
        console.log('FILE    :', object[i].file);
        console.log('STATUS  :', object[i].status);
      }
      console.log((colors.rainbow('\n================================= md-links-angieli')) + "👩🏻‍💻" + (colors.rainbow('=================================')));
      process.exit(0);
    }).catch((error) => { console.log(error); })
  } else {
    console.log(colors.yellow('This invalid command, if you need help use the command --help or --h'));
    console.log((colors.rainbow('\n================================= md-links-angieli')) + "👩🏻‍💻" + (colors.rainbow('=================================')));

  }
};

cli()






