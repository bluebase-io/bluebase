#!/usr/bin/env node

let bluebase = require('../gateway');
const uuid = require('uuid/v4');
const program = require('commander');
const chalk = require('chalk');
program.version('1.0.6');

program
  .name('bluebase-cli')
  .description('Bluebase CLI')

  program
  .command('gateway')
  .description('spin up a bluebase gateway and begin scanning for ble peripherals')
  .option('-m, --mac <type>', 'add a mac address filter')
  .action(() => {
    print(chalk.dim.bold(' ⬢  Bluebase gateway pipe started (Hit Ctrl-C to stop)'));
    let gatewayUuid = uuid();
    print(chalk.dim(' gateway ' + gatewayUuid + ' synced: ') + chalk.bold(getTimestamp()))
    print(chalk.dim(' scanning for BLE devices...'))
    bluebase.start(gatewayUuid, (device) => {
      print(chalk.dim('   data synced: ') + chalk.bold(getTimestamp()) + ' ' + chalk.cyan.bold(device.mac));
    });
  });

  function getTimestamp() {
      let date = new Date();
      return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }

  function print(str) {
    console.log(str);
  }

  if (process.argv.length == 2) {
    program.help()
  }

program.parse(process.argv);
