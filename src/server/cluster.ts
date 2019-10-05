/**
 * Created by Hafeez on 9/23/2016.
 */
import cluster from 'cluster';
import dotenv from 'dotenv';
import fs from 'fs';
import os from 'os';

dotenv.config();
const environment = process.env.DEFAULT_ENV;
const host = environment ? process.env[`${environment}_SERVER`] : 'localhost';
const port = environment ? process.env[`${environment}_SERVER_PORT`] : 3000;
const availableCPUs: number = os.cpus().length;
const cpuCores: number = Number(process.env.CPU_CORES);
const numCPUs: number = (cpuCores < availableCPUs) ? cpuCores : availableCPUs;

/* const restartWorkers = () => {
    let workerId: string;
    const workerIds = new Set();

    if (cluster.workers) {
        // create a copy of current running worker ids
        for (workerId of cluster.workers) {
            workerIds.add(cluster.workers[workerId]);
        }

        workerIds.forEach((wid) => {
            cluster.workers[wid].send({
                text: 'shutdown',
                from: 'master'
            });

            setTimeout(() => {
                if (cluster.workers[workerId]) {
                    cluster.workers[workerId].kill('SIGKILL');
                }
            }, 5000);
        });
    }

}; */

if (cluster.isMaster) {

    console.log('Master cluster setting up ' + numCPUs + ' workers...');
    console.log(`Master ${process.pid} started`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();
        worker.on('online', () => {
            console.log(`Worker ${worker.process.pid} started`);
        });
        worker.on('exit', () => {
            console.log(`worker ${worker.process.pid} stopped working`);
            cluster.fork();
        });
    }

    // set up listener of file changes for restarting workers
    /* fs.readdir('.', (err, files) => {
        files.forEach((file) => {
            fs.watch(file, () => {
                restartWorkers();
            });
        });
    }); */

    cluster.on('fork', (worker) => {
        console.log(`Worker ${worker.process.pid} started`);
    });

    cluster.on('online', (worker) => {
        console.log('worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log('worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        worker = cluster.fork();
        /* worker.on('message', (arguments) => {
            console.log('arguments', arguments);
        }); */
    });
} else {
    process.on('message', (message) => {
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
