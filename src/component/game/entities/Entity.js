class Entity {
  constructor() {
    this.mesh;
    this.position;
  }

  setPosition(position) {
    this.position = position;
    this.mesh.position.set(position.x, position.y, position.z);
  }

  update() {

  }
}

export default Entity;
