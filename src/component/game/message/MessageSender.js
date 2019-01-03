import PlayerStateMessage from './send/PlayerState';
import PlaceBombMessage from './send/PlaceBomb';

class MessageSender {

  constructor(client, ws) {
    this.ws = ws;
    this.world = client.world;
    this.interval = 0;

    this.start = this.start.bind(this);
  }

  start() {
    let updatePacket = new PlayerStateMessage(this.world);
    this.interval = setInterval(() => {
      if(this.world.player !== undefined) {
        this.ws.send(updatePacket.toString());
      }
    }, 33);
  }

  stop() {
    clearInterval(this.interval);
  }

  send(message) {
    this.ws.send(message.toString());
  }

  informPlaceBomb() {
    let packet = new PlaceBombMessage();
    this.ws.send(packet.toString());
  }

}

export default MessageSender;
