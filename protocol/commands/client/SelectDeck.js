module.exports = class SelectDeck {
    constructor(device, reader) {
        this.device = device
        this.reader = reader
    }

    decode() {
        this.startTick = this.reader.readRrsInt32();
        this.endTick = this.reader.readRrsInt32();
        this.accountHighID = this.reader.readRrsInt32();
        this.accountLowID = this.reader.readRrsInt32();
        this.deckIndex = this.reader.readRrsInt32();
        this.device.player.selectedDeck = this.deckIndex;
        this.device.player.save();
    }

    process() {

    }
}

module.exports.code = 512