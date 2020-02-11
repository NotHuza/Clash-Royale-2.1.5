
module.exports = class OpenFreeChest {
    constructor(device, reader) {
        this.device = device
        this.reader = reader
    }

    decode() {
        console.log('Open chest \n', this.reader.toString('hex'))
        this.startTick = this.reader.readRrsInt32();
        this.endTick = this.reader.readRrsInt32();
        this.accountHighID = this.reader.readRrsInt32();
        this.accountLowID = this.reader.readRrsInt32();
        this.gold = this.reader.readRrsInt32();
        console.log(this.startTick, this.endTick, this.accountHighID, this.accountLowID, this.gold);

        let FreeChestData = new global.CommandsFactory.serverCommands.ChestsData(this.device, 'FreeChest');
        FreeChestData.encode();
        FreeChestData.send(true);
    }

    process() {

    }
}

module.exports.code = 510