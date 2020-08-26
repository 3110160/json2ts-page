#!/usr/bin/env node

const { Command } = require("commander");
const shell = require("shelljs");
const program = new Command();
program
  .option("-h, --help", "help only")
  .option("-p, --port", "input port to run");

// 参数解析
program.parse(process.argv);

if (program.port) {
  if(!program.args.length){
    shell.echo('请输入端口号');
    shell.exit(1);
  }
  shell.exec(`port=${program.args[0]} node app.js`);
}
