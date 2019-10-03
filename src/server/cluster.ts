/**
 * Created by Hafeez on 9/23/2016.
 */

require('dotenv').config();
const cluster = require('cluster'),
    fs = require('fs'),
    os = require('os'),
    environment = process.env['DEFAULT_ENV'],
    host = environment ? process.env[`${environment}_SERVER`] : 'localhost',
    port = environment ? process.env[`${environment}_SERVER_PORT`] : 3000,
    availableCPUs = os.cpus().length,
    numCPUs = (process.env.CPU_CORES < availableCPUs) ? process.env.CPU_CORES : availableCPUs;
let worker;

const restartWorkers = function restartWorkers() {
    var wid, workerIds = [];

    // create a copy of current running worker ids
    for (wid in cluster.workers) {
        workerIds.push(wid);
    }

    workerIds.forEach(function (wid) {
        cluster.workers[wid].send({
            text: 'shutdown',
            from: 'master'
        });

        setTimeout(function () {
            if (cluster.workers[wid]) {
                cluster.workers[wid].kill('SIGKILL');
            }
        }, 5000);
    });
};

if (cluster.isMaster) {

    console.log('Master cluster setting up ' + numCPUs + ' workers...');

    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        worker = cluster.fork();
        worker.on('message', function () {
            console.log('arguments', arguments);
        });
    }

    // set up listener of file changes for restarting workers
    fs.readdir('.', function (err, files) {
        files.forEach(function (file) {
            fs.watch(file, function () {
                restartWorkers();
            });
        });
    });


    cluster.on('online', function (worker) {
        //console.log('worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        worker = cluster.fork();
        worker.on('message', function () {
            console.log('arguments', arguments);
        });
    });
} else {
    process.on('message', function (message) {
        if (message.type === 'shutdown') {
            process.exit(0);
        }
    });

    /*
    process.on('SIGTERM', function onSigterm () {
      console.info('Got SIGTERM. Graceful shutdown start', new Date().toISOString())
      // start graceul shutdown here
      shutdown();
    });

    function shutdown() {
      server.close(function onServerClosed (err) {
        if (err} {
          console.error(err);
          process.exit(1);
        }

        closeMyResources(function onResourcesClosed (err) {
          // error handling
          process.exit();
        });
      });
    }
    */


    console.log('Worker ' + process.pid + ' is alive!');

    // Run application now
    require('./app')();
}