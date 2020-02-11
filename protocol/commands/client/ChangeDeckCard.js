const cardsUtils = require('../../../utils/cardUtils');
const utils = require('../../../utils');

module.exports = class SelectDeck {
    constructor(device, reader) {
        this.device = device
        this.reader = reader
    }

    decode() {
        console.log('Change deck card \n', this.reader.toString('hex'))
        this.startTick = this.reader.readRrsInt32();
        this.endTick = this.reader.readRrsInt32();
        this.accountHighID = this.reader.readRrsInt32();
        this.accountLowID = this.reader.readRrsInt32();
        this.cardIndex = this.reader.readRrsInt32();
        this.slot = this.reader.readRrsInt32();
        this.unk2 = this.reader.readRrsInt32();

        if(!this.device.cardsOutOfDeck)
        {
            this.device.cardsOutOfDeck = [];
            this.device.player.cards.forEach(card => {
                if (!this.device.player.decks[this.device.player.selectedDeck].includes(cardsUtils.instanceIDtoSCID(card.ID))) {
                    this.device.cardsOutOfDeck.push(card);
                }
            });
        }

        //--- Fetching the old deck card object from 'cards' array ---//
        let oldDeckCard = utils.findObjectByKey(this.device.player.cards, 'ID', cardsUtils.SCIDtoInstanceID(this.device.player.decks[this.device.player.selectedDeck][this.slot]));
        
        
        //console.log(this.device.player.decks[this.device.player.selectedDeck][this.slot]);
        let selectedDeck = this.device.player.decks[this.device.player.selectedDeck];
        let newDeckCardSCID = cardsUtils.instanceIDtoSCID(this.device.cardsOutOfDeck[this.cardIndex].ID);
        
        selectedDeck[this.slot] = newDeckCardSCID;
        this.device.player.decks[this.device.player.selectedDeck] = selectedDeck;
        this.device.cardsOutOfDeck[this.cardIndex] = oldDeckCard;
        console.log('Deck card changed:', this.cardIndex, 'At slot:', this.slot)
        this.device.player.markModified('decks')
        this.device.player.save();
    }

    process() {

    }
}

module.exports.code = 505