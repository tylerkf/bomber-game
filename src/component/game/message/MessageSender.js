
class MessageSender {
  constructor(client, ws) {
    this.ws = ws;
    this.world = client.world;

    this.setupInformMovement = this.setupInformMovement.bind(this);
    setTimeout(this.setupInformMovement, 1000);
  }

  setupInformMovement() {
    setInterval(() => {
      let pos = this.world.player.position;
      this.ws.send(JSON.stringify({
        type: 'position',
        x: pos.x,
        y: pos.y,
        z: pos.z
      }));
    }, 33);
  }


}

export default MessageSender;
