module.exports = class UnknownCommand {
    constructor(device, reader) {
        this.device = device
        this.reader = reader
    }

    decode() {
        this.startTick = this.reader.readRrsInt32();
        this.endTick = this.reader.readRrsInt32();
        this.accountHighID = this.reader.readRrsInt32();
        this.accountLowID = this.reader.readRrsInt32();
        this.unk = this.reader.readRrsInt32();
    }

    process() {

    }
}

module.exports.code = 568