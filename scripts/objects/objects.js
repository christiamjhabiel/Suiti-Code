/* codigo hecho y editado por spacesxd */

const objectList = {}; //lista de objetos

// un if/else poco profesional que esta pa apañar un rato
function crearObjeto(tipo, nombre){
  if(tipo == "cubo"){
    crearCubo(nombre);//facil, si resibe cubo es cubo si es cono es cono xd
  }else if(tipo == "cono"){
    crearCono(nombre);
  }
}

// FUNCIONES PARA CREAR PUTOS OBJETOS 🗿

function crearCubo(name){
  if (objectList[name]) {
    console.warn(`Ya existe un objeto con nombre ${name}`);
    return;
  }

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x1a1a1a });

  const mesh = new THREE.Mesh(geometry, material);
  objectList[name] = mesh;
  
  scene.add(mesh);
}

function crearCono(name){
  if (objectList[name]) {
    console.warn(`Ya existe un objeto con nombre ${name}`);
    return;
  }

  const geometry = new THREE.ConeGeometry(5, 10, 22);
  const material = new THREE.MeshBasicMaterial({ color: 0x1a1a1a });

  const mesh = new THREE.Mesh(geometry, material);
  objectList[name] = mesh;
  
  scene.add(mesh);
}
