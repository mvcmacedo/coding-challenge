const fs = require("fs");

class Database {
    memory;
    transactions;

    constructor() {
        this.memory = new Map();
        this.transactions = [];

        this.readMemory();
        this.persistMemory();
        this.readTransactions();
        this.persistTransactions()
    }

    readMemory() {
        const memory_data = fs.readFileSync('db-memory.json', 'utf-8');

        if (memory_data) { 
            this.memory = new Map(JSON.parse(memory_data));
        }
    }

    readTransactions() {
        const transaction_data = fs.readFileSync('transactions.json', 'utf-8');

        if (transaction_data) { 
            this.transactions = JSON.parse(transaction_data);
        }
    }

    begin() {
        // creates a copy for this first block
        if (!this.transactions.length) this.transactions.push([...this.memory]);

        this.transactions.push([...this.memory]);
        this.persistTransactions();
    }

    rollback () {
        if (!this.transactions.length) {
            console.log('NO TRANSACTIONS');
            return;
        }

        this.transactions.pop();
        this.memory = this.transactions[this.transactions.length - 1];

        // delete that copy created on beginning the first block
        if (this.transactions.length === 1) this.transactions = [];

        this.persistTransactions();
        this.persistMemory();
    }

    commit() {
        if (!this.transactions.length) {
            console.log('NO TRANSACTIONS');
            return;
        }

        this.transactions = [];
        this.persistTransactions();
    }

    set(key, value) {
        this.memory.set(key, value);
        this.persistMemory();

        if (this.transactions.length) {
            this.updateTransaction();
        }
    }

    get(key) {
        const value = this.memory.get(key);

        console.log(value || 'NULL');
        return;
    }

    unset(key) {
        const value = this.memory.get(key);
        
        if (!value) {
            console.log('NAME NOT FOUND');
            return;
        }

        this.memory.delete(key);
        this.persistMemory();
    }

    numequalto(value) {
        let count = 0;

        for (const memoryValue of this.memory.values()) {
            if (memoryValue == value) count ++;
            else continue;
        }

        console.log(count);
        return;
    }
    
    deleteAll() {
        this.transactions = [];
        this.memory = new Map();
        this.persistMemory();
        this.persistTransactions();
    }

    updateTransaction() {
        const latestTransactionIdx = this.transactions.length - 1;
        this.transactions[latestTransactionIdx] = [...this.memory];
        this.persistTransactions();
    }

    persistMemory() {
        fs.writeFileSync('db-memory.json', JSON.stringify([...this.memory]) , 'utf-8');     
    }

    persistTransactions() {
        fs.writeFileSync('transactions.json', JSON.stringify(this.transactions) , 'utf-8');     
    }
}

module.exports = Database;