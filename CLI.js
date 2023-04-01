#!/usr/bin/env node
const { mdLinks } = require('./index');
const {
 totalLinks, uniqueLinks, brokenLinks,
} = require('./Api.js');
const process =require('process');
var colors = require('colors/safe');
const emoji = require('node-emoji');
const argv = process.argv;//Asigna los argumentos de línea de comando
const path = process.argv[2];
console.log(process.argv)


function cli (){
  const validate = argv.includes('--validate')|| argv.includes('--v');
  const stats = argv.includes('--stats')|| argv.includes('--s');
  const help = argv.includes('--help')|| argv.includes('--h');
  

 if (path === undefined || path === help ){
  console.log((colors.rainbow('\n-------------------------------------------------------------\n                    Welcome to AngieLi MD-links')) + emoji.get('👩🏻‍💻') + (colors.rainbow( '\n-------------------------------------------------------------' )));
  console.log(colors.bgMagenta('\n🔎Instructions:'));
        console.log(colors.white('1. Submit a valid path right after "AngieLi-md-links".'));
        console.log(colors.white('2. To see links route, url, status message, status number and text, write "--validate" or "--v" right after your path.'));
        console.log(colors.white('3. To see total links number and unique links number, write "--stats" or "--s" right after your path.'));
        console.log(colors.white('4. To additionally see broken links number, add "--stats --validate" or "--s --v" right after your path.'));
        console.log(colors.white('5. To see these instructions again, you can type "--help" or "--h" right after "AngieLi-md-links".'));
        console.log(colors.rainbow('======================================================================================================='));
    process.exit(0);//para salir de la aplicación con éxito.
 }
 else if (stats && validate){
  return mdLinks(path, { validate: validate, stats }).then((links) => {
    console.log(colors.bgMagenta('\nTOTAL LINKS  :')+(colors.bgBlue(totalLinks(links))));
    console.log(colors.bgMagenta('\nUNIQUE LINKS :')+(colors.bgBlue(uniqueLinks(links))));
    console.log(colors.bgMagenta('\nBROKEN LINKS :')+(colors.bgBlue(brokenLinks(links))));
  }).catch((error) => { console.log(error); })
}else if (stats && !validate){

 }
  else if (!stats && validate){

 }
 else{

 }
};


cli()

/*const options = {
  validate: process.argv.includes('--validate'),
  };
  const stats = process.argv.includes('--stats');

/*mdLinks(path, options)//llamo mi funcion en cada if
  .then((links) => {
    console.log(links);
    if (stats && options.validate){//¿Qué va imrimir mi programa?
      /*$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1*/
       
   /* }else if(stats){

    }else if (options.validate){
       
    }else {

    }
  })
  .catch((err) => {
    console.error(err.message);
  });*/





