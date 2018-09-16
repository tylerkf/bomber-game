class Entity {
  constructor() {
    this.mesh;
    this.position;
  }

  setPosition(position) {
    this.position = position;
    this.mesh.position.set(position);
  }

  update() {

  }
}

export default Entity;
