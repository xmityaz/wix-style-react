const _ = require('lodash');
const chokidar = require('chokidar');
const postcss = require('postcss');
const fs = require('fs');
const bidi = require('postcss-bidirection');
const path = require('path');

const supportedComponent = ['DropdownLayout'];

function findFilesInDir(startPath, filter) {

  let results = [];

  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return [];
  }

  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      results = results.concat(findFilesInDir(filename, filter));
    } else if (filename.indexOf(filter) >= 0) {
      console.log('-- found: ', filename);
      results.push(filename);
    }
  }
  return results;
}

function buildAllBidiCSS() {
  supportedComponent.forEach(elem => {
    const dir = `dist/src/${elem}/`;
    findFilesInDir(dir, '.scss').forEach(cssFile => {
      buildBidiCSS(cssFile);
    });
  });
}

function buildBidiCSS(path) {
  fs.readFile(path, (err, css) => {
    if (err) {
      console.log(err);
    } else {
      postcss([bidi]).process(css).then(result => {
        fs.writeFile(path, result.css, err => {
          if (err) {
            console.log(err);
          }
        });
      });
    }
  });
}

function watchAll() {
  supportedComponent.forEach(elem => {
    const dir = `dist/src/${elem}/`;
    findFilesInDir(dir, '.scss').forEach(cssFile => {
      watch(cssFile);
    });
  });
}

function watch(path) {
  const onChange = path => buildBidiCSS(path);
  chokidar.watch(path, {ignoreInitial: true}).on('change', onChange);
  chokidar.watch(path, {ignoreInitial: true}).on('add', onChange);
}

if (process.argv.indexOf('--watch') !== -1) {
  watchAll();
}
