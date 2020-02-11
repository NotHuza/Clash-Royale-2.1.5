module.exports = class BuyShopElement {
    constructor(device, reader) {
        this.device = device
        this.reader = reader
    }

    decode() {
        console.log('Open silver chest \n', this.reader.toString('hex'))
        this.startTick = this.reader.readRrsInt32();
        this.endTick = this.reader.readRrsInt32();
        this.accountHighID = this.reader.readRrsInt32();
        this.accountLowID = this.reader.readRrsInt32();
        this.itemIndex = this.reader.readRrsInt32();
        this.chestID = this.reader.readRrsInt32();
        console.log('Going to handle:', 'Shop item with index',this.itemIndex);

        let ShopChestData = new global.CommandsFactory.serverCommands.ChestsData(this.device, 'CrownChest',this.itemIndex);
        ShopChestData.encode();
        ShopChestData.send(true);
    }

    process() {

    }
}

module.exports.code = 544