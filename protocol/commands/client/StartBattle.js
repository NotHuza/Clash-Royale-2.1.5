const utils = require('../../../utils')

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
        this.isBattleEvent = this.reader.readRrsInt32();
        this.unk2 = this.reader.readRrsInt32();
        this.battleEventID = this.reader.readRrsInt32();
    }

    async process() {
        this.device.searchingBattle = true;
        let players = Object.values(global.players).filter(player => player.searchingBattle === true && player !== this.device);
        let player2 = players[utils.randomInt(0, players.length)]

        if (player2 && player2.searchingBattle) {
            this.device.battleOpponent = player2
            player2.battleOpponent = this.device
            this.device.searchingBattle = false;
            player2.searchingBattle = false;



            let UdpServerInfos = new global.MessageFactory.serverMessages.UdpServerInfos(this.device);
            UdpServerInfos.encode();
            UdpServerInfos.send();

            let SectorState = new global.MessageFactory.serverMessages.SectorState(this.device, player2);
            SectorState.encode();
            SectorState.send();


             this.device.client.write('53 C3 00 00 18 00 00 85 01 C3 92 BF CB 06 00'.replace(/\s/g, ''), 'hex');
             this.device.client.write('53 C3 00 00 18 00 00 86 01 EB A2 8F CC 08 00'.replace(/\s/g, ''), 'hex');
             this.device.client.write('53 c3 00 00 17 00 00 04  fb 86 be 88 06 00'.replace(/\s/g, ''), 'hex');
             this.device.client.write('53 c3 00 00 17 00 00 05  c2 bd 90 88 04 00'.replace(/\s/g, ''), 'hex');
             this.device.client.write('53 c3 00 00 17 00 00 06  a6 fa 82 c4 0d 00'.replace(/\s/g, ''), 'hex');
             this.device.client.write('53 c3 00 00 17 00 00 15  e1 be b7 80 0b 00'.replace(/\s/g, ''), 'hex');
             this.device.client.write('53 c3 00 00 17 00 00 16  8e bf c7 92 03 00'.replace(/\s/g, ''), 'hex');

            let UdpServerInfos2 = new global.MessageFactory.serverMessages.UdpServerInfos(player2);
            UdpServerInfos2.encode();
            UdpServerInfos2.send();

            let SectorState2 = new global.MessageFactory.serverMessages.SectorState(player2, this.device);
            SectorState2.encode();
            SectorState2.send();

             player2.client.write('53 C3 00 00 18 00 00 85 01 C3 92 BF CB 06 00'.replace(/\s/g, ''), 'hex');
             player2.client.write('53 C3 00 00 18 00 00 86 01 EB A2 8F CC 08 00'.replace(/\s/g, ''), 'hex');
             player2.client.write('53 c3 00 00 17 00 00 03  f4 d0 eb 88 08 00'.replace(/\s/g, ''), 'hex');
             player2.client.write('53 c3 00 00 17 00 00 04  fb 86 be 88 06 00'.replace(/\s/g, ''), 'hex');
             player2.client.write('53 c3 00 00 17 00 00 05  c2 bd 90 88 04 00'.replace(/\s/g, ''), 'hex');
             player2.client.write('53 c3 00 00 17 00 00 06  a6 fa 82 c4 0d 00'.replace(/\s/g, ''), 'hex');
             player2.client.write('53 c3 00 00 17 00 00 15  e1 be b7 80 0b 00'.replace(/\s/g, ''), 'hex');
             player2.client.write('53 c3 00 00 17 00 00 16  8e bf c7 92 03 00'.replace(/\s/g, ''), 'hex');

        }
    }
}

module.exports.code = 594

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}