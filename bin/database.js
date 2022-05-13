const fs = require("fs");

class Database {
    memory;

    constructor() {
        this.init();
    }

    init() {
        const memory_data = fs.readFileSync('db-memory.json', 'utf-8'); // reads current memory data
        
        if (!memory_data) { // no data in memory
            this.memory = new Map();
        } else { // transforms [[x, y]] into key|value Map
            this.memory = new Map(JSON.parse(memory_data));
        }

        this.persist();
    }

    findAll() {
        return this.memory;
    }

    set(key, value) {
        this.memory.set(key, value);
        this.persist();
    }

    get(key) {
        const value = this.memory.get(key);

        if (!value) return null;

        return value;
    }

    unset(key) {
        const value = this.memory.get(key);
        
        if (!value) {
            console.log('Name not found');
            return;
        }

        this.memory.delete(key);
        this.persist();
    }

    numequalto(value) {
        let count = 0;

        for (const memoryValue of this.memory.values()) {
            if (memoryValue == value) count ++;
            else continue;
        }

        return count;
    }
    
    deleteAll() {
        this.memory = new Map();
        this.persist();
    }

    persist() {
        fs.writeFileSync('db-memory.json', JSON.stringify([...this.memory]) , 'utf-8');     
    }
}

module.exports = Database;