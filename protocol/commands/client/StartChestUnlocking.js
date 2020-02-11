module.exports = class UnlockChest {
    constructor(device, reader) {
        this.device = device
        this.reader = reader
    }

    decode() {
        console.log('Unlock Chest \n', this.reader.toString('hex'))
        this.startTick = this.reader.readRrsInt32();
        this.endTick = this.reader.readRrsInt32();
        this.accountHighID = this.reader.readRrsInt32();
        this.accountLowID = this.reader.readRrsInt32();
    }

    process() {

    }
}

module.exports.code = 542