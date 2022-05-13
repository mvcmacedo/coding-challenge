#!/usr/bin/env node

const yargs = require('yargs')
const Database = require("./database")


const database = new Database();

yargs.command({
    command: 'set',
    describe: 'Set the variable name to the value value.',
    builder: {
        n: {
            describe: 'Name',
            demandOption: true,  
            type: 'string'     
        },
        v: {  
            describe: 'Value',
            demandOption: true,
            type: 'string'
        }
    },
  
    handler(argv) {        
        database.set(argv.n, argv.v);    
    }
})
.command({
    command: 'get',
    describe: 'Print out the value of the variable name',
    builder: {
        n: {
            describe: 'Name',
            demandOption: true,  
            type: 'string'     
        },
    },
  
    handler(argv) {
        console.log(database.get(argv.n))
    }
})
.command({
    command: 'unset',
    describe: 'Unset the variable name',
    builder: {
        n: {
            describe: 'Name',
            demandOption: true,  
            type: 'string'     
        },
    },
  
    handler(argv) {
        database.unset(argv.n);
    }
})
.command({
    command: 'numequalto',
    describe: 'Print out the number of variables that are currently set to value',
    builder: {
        v: {
        describe: 'Value',
            demandOption: true,  
            type: 'string'     
        },
    },
  
    handler(argv) {
        console.log(database.numequalto(argv.v));
    }
})
.command({
    command: 'end',
    describe: 'Exit the program',
  
    handler() {
        database.deleteAll();
    }
})

yargs.parse();