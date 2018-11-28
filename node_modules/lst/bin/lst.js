#!/usr/bin/env node
'use strict';
var meta = require('../package.json');
var cli = require('commander');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');

function coerceLevel (n) {
  n = parseInt(n, 10);
  return n > 0 ? n : 1;
}

cli
  .version(meta.version)
  .description('Recursively print a pretty directory tree')
  .option('-l, --level <n>', 'recurse <n> levels deep', coerceLevel)
  .option('-i, --ignore <blob>', 'ignore <blob> patterns')
  .option('-h, --hide', 'hide system files (dotfiles)')
  .option('-n, --node_modules', 'recurse through node_modules folders')
  .option('-g, --git', 'recurse through .git folders')
  .arguments('[dir]')
  .action(function (dir) {
    cli.dir = path.resolve(dir);
    try { var isDirectory = fs.statSync(cli.dir).isDirectory(); }
    catch (err) { exitNotDir(dir); }
    if (!isDirectory) exitNotDir(dir);
    function exitNotDir (str) {
      console.error(chalk.red(str), 'is not a directory');
      process.exit(1);
    }
  })
  .parse(process.argv);

cli.dir = cli.dir || path.resolve(process.cwd());

var draw = {
  dash: '─',
  vert: '│',
  node: '├',
  last: '└'
};

var cwd = path.parse(cli.dir);
console.log(chalk.underline(cwd.base));

fs.readdir(cli.dir, function(err, fileNames){
  if (err) return console.error(chalk.red(err));
  var folders = [];
  var files = [];
  var count = 0;
  fileNames.forEach(function(fileName){
    fs.lstat(path.join(cli.dir, fileName), function (err2, entity) {
      count++;
      if (err2) console.error(chalk.red(err2));
      else if (entity.isDirectory()) folders.push(fileName);
      else if (entity.isFile()) files.push(fileName);
      if (count === fileNames.length) report();
    });
  });
  function report () {
    files.sort(fileSort).forEach(function(file){
      if (dotfile(file)) file = chalk.gray(file);
      console.log(draw.node + draw.dash + draw.dash + ' ' + file);
    });
    folders.sort(fileSort).forEach(function(folder){
      folder = dotfile(folder) ? chalk.gray.underline(folder) : chalk.underline(folder);
      console.log(draw.node + draw.dash + draw.dash + ' ' + folder);
    });
  }
});

function fileSort (filename1, filename2) {
  filename1 = filename1.toLowerCase();
  filename2 = filename2.toLowerCase();
  if (dotfile(filename1)) filename1 = '~' + filename1.slice(1);
  if (dotfile(filename2)) filename2 = '~' + filename2.slice(1);
  if (filename1 === filename2) return 0;
  return (filename1 > filename2) ? 1 : -1;
}

function dotfile (filename) {
  return filename[0] === '.';
}
