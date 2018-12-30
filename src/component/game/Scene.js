import * as THREE from 'three';

class Scene {
  constructor(canvas) {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    this.camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 10000);

    this.renderer.setPixelRatio(window.devicePixelRatio);
  	this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.set(0, 0, 10);

    this.scene.background = new THREE.Color(0x333333);
    this.scene.add(new THREE.AmbientLight(0xffffff));
  }

  update(position) {
    this.camera.position.x = position.x;
    this.camera.position.y = position.y;
  }

  add(object) {
    this.scene.add(object);
  }

  remove(object) {
    this.scene.remove(object);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default Scene;
