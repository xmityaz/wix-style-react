const {spawn} = require('child_process');
const psTree = require('ps-tree');

let child;

module.exports.config = {
  specs: ['test/**/*.e2e.js', 'src/**/*.e2e.js'],
  baseUrl: `http://localhost:6006/`,

  onPrepare() {
    browser.ignoreSynchronization = true;
  },
};
