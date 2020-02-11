module.exports = class OpenCrownChest {
    constructor(device, reader) {
        this.device = device
        this.reader = reader
    }

    decode() {
        this.startTick = this.reader.readRrsInt32();
        this.endTick = this.reader.readRrsInt32();
        this.accountHighID = this.reader.readRrsInt32();
        this.accountLowID = this.reader.readRrsInt32();


    }

    process() {
        let CrownChestData = new global.CommandsFactory.serverCommands.ChestsData(this.device, 'CrownChest');
        CrownChestData.encode();
        CrownChestData.send(true);
    }
}

module.exports.code = 595