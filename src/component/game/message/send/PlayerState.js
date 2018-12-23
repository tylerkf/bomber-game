class PlayerStateMessage {
  constructor(world) {
    this.world = world;

    this.generate = this.generate.bind(this);
  }

  generate() {
    let p = this.world.player;
    return {
      type: 'player state',
      position: [p.position.x, p.position.y, p.position.z],
      velocity: [p.velocity.x, p.velocity.y, p.velocity.z],
      state: p.state
    }
  }

  toString() {
    return JSON.stringify(this.generate());
  }
}

export default PlayerStateMessage;
