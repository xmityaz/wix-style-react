const _ = require('lodash');
const chokidar = require('chokidar');
const postcss = require('postcss');
const fs = require('fs');
const bidi = require('postcss-bidirection');
const path = require('path');
const supportedComponent = ['DropdownLayout'];

let watcher = null;

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
  if (watcher) {
    console.log('*********************************************************STOP WATCHING******************************************************');
    let watchedPaths = watcher.getWatched();
    console.log('***************************************************************************************************************' + JSON.stringify(watchedPaths));
    watcher.close();
    watchedPaths = watcher.getWatched();
    console.log('***************************************************************************************************************' + JSON.stringify(watchedPaths));
  }

  fs.readFile(path, (err, css) => {
    if (err) {
      console.log(err);
    } else {
      postcss([bidi]).process(css).then(result => {
        fs.writeFile(path, result.css.replace('html[dir="', '[dir="'), err => {
          if (err) {
            console.log(err);
          } else {
            watchIfNeeded(path);
          }
        });
      });
    }
  });
}

function watchAllIfNeeded() {
  if (process.argv.indexOf('--watch') > -1) {
    console.log('*********************************************************WATCHING******************************************************');
    supportedComponent.forEach(elem => {
      const dir = `dist/src/${elem}/`;
      findFilesInDir(dir, '.scss').forEach(cssFile => {
        watchIfNeeded(cssFile);
      });
    });
  }
}

function watchIfNeeded(path) {
  if (process.argv.indexOf('--watch') > -1) {
    watcher = chokidar.watch(path, {ignoreInitial: true}).on('change', path => {
      console.log('***** ' + JSON.stringify(watcher.getWatched()));
      buildBidiCSS(path);
    });
  }
}

if (process.argv.indexOf('--watch') === -1) {
  buildAllBidiCSS();
} else {
  watchAllIfNeeded();
}
