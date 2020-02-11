module.exports = class OpenChest {
    constructor(device, reader) {
        this.device = device
        this.reader = reader
    }

    decode() {
        this.startTick = this.reader.readRrsInt32();
        this.endTick = this.reader.readRrsInt32();
        this.accountHighID = this.reader.readRrsInt32();
        this.accountLowID = this.reader.readRrsInt32();
        this.chestIndex = this.reader.readRrsInt32();
    }

    process() {
        let chest = this.device.player.chests[0];
        switch (chest.chestID) {
            case 114: {
                let SlotChestData = new global.CommandsFactory.serverCommands.ChestsData(this.device, 'LegendaryChestSlot', this.chestIndex);
                SlotChestData.encode();
                SlotChestData.send(true);
            }
        }

        this.device.player.chests.splice(this.chestIndex / 2 - 4, 1);
        this.device.player.save();
    }
}

module.exports.code = 597