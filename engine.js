const canvas = document.getElementById('canvas');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  330 / 230,
  0.1,
  1000
);

camera.position.z = 5;

const render = new THREE.WebGLRenderer({ canvas });
render.setSize(330, 230);

const controls = new THREE.OrbitControls(camera, canvas);

const grid = new THREE.GridHelper(50, 100);
scene.add(grid);

const axis = new THREE.AxesHelper( 2 , 2 , 2);
scene.add(axis);

function animate(){
  requestAnimationFrame(animate);
  
  controls.update();
  
  render.render(scene, camera);
}

animate();