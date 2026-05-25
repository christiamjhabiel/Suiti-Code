/* codigo hecho y editado por spacesxd */

/* holaaaa, si eres dev seguro estaras tipo:
porque three js r140??? es muy viejo!. Y tenés razón
pero resulta que como uso blockly y este no es precisamente 
modular(si hay módulos pero no me resultan cómodos), y 
three es modular en sus versiones modernas tuve que irme
atras. Espero entiendas :P
*/

//configuramos three xd
const canvas = document.getElementById('canvas');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  330 / 230,
  0.1,
  1000
);
//la movemos pa tras para que se vea algo
camera.position.z = 5;

const render = new THREE.WebGLRenderer({ canvas });
render.setSize(330, 230);

//esto ya es pura decoración (axis, grid)
const controls = new THREE.OrbitControls(camera, canvas);

const grid = new THREE.GridHelper(50, 100);
scene.add(grid);

const axis = new THREE.AxesHelper( 2 , 2 , 2);
scene.add(axis);

//loop principal
function animate(){
  requestAnimationFrame(animate);
  
  controls.update();
  
  render.render(scene, camera);
}

animate();
