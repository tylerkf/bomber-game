import PlayerStateMessage from './send/PlayerState';
import PlaceBombMessage from './send/PlaceBomb';

class MessageSender {

  constructor(client, ws) {
    this.ws = ws;
    this.world = client.world;

    this.start = this.start.bind(this);
  }

  start() {
    let updatePacket = new PlayerStateMessage(this.world);
    setInterval(() => {
      if(this.world.player !== undefined) {
        this.ws.send(updatePacket.toString());
      }
    }, 33);
  }

  send(message) {
    this.ws.send(message.toString());
  }

  informPlaceBomb(level) {
    let packet = new PlaceBombMessage(level);
    this.ws.send(packet.toString());
  }

}

export default MessageSender;
