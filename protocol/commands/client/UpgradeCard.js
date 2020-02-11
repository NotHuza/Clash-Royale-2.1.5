const cardsUtils = require('../../../utils/cardUtils');
const utils = require('../../../utils');

module.exports = class UpgradeCard {
    constructor(device, reader) {
        this.device = device
        this.reader = reader
    }

    decode() {
        this.startTick = this.reader.readRrsInt32();
        this.endTick = this.reader.readRrsInt32();
        this.accountHighID = this.reader.readRrsInt32();
        this.accountLowID = this.reader.readRrsInt32();
        this.cardType = this.reader.readRrsInt32();
        this.cardID = this.reader.readRrsInt32();
    }

    process() {
        let cardIndex = this.device.player.cards.indexOf(utils.findObjectByKey(this.device.player.cards, 'ID', cardsUtils.SCIDtoInstanceID(this.cardType * 1000000 + this.cardID)));
        let card = this.device.player.cards[cardIndex];
        card.level += 1;
        this.device.player.cards[cardIndex] = card;
        this.device.player.markModified('cards');
        this.device.player.save();
    }
}

module.exports.code = 592