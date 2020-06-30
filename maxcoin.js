const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, '01/01/2020', 'Genesis Block', '0')
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let maxCoin = new Blockchain();
maxCoin.addBlock(new Block(1, '30/06/2020', {amount: '4444'}));
maxCoin.addBlock(new Block(2, '30/06/2020', {amount: '244'}));
maxCoin.addBlock(new Block(3, '30/06/2020', {amount: '244'}));


console.log(JSON.stringify(maxCoin, null, 3))
console.info('is Blockchain valid:', maxCoin.isChainValid());

console.log();
console.log('Hacking Blockchain...');
maxCoin.chain[2].data = {amount: '3'};
maxCoin.chain[1].hash = maxCoin.chain[1].calculateHash();
console.info('is Blockchain valid:', maxCoin.isChainValid());

