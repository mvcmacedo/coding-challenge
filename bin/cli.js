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
       database.get(argv.n);
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
        database.numequalto(argv.v);
    }
})
.command({
    command: 'begin',
    describe: 'Begin a transaction block',
  
    handler() {
        database.begin();
    }
})
.command({
    command: 'rollback',
    describe: 'Rollbacl last transaction block',
  
    handler() {
        database.rollback();
    }
})
.command({
    command: 'commit',
    describe: 'Commit transactions',
  
    handler() {
        database.commit();
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