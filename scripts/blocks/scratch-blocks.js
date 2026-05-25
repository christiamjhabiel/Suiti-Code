//ya me canse de poner esta webada ya ssben que esta mrd la hize yo

//configuramos los legos 🗣️
const workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox'),
  renderer: 'zelos',
  zoom: {
    controls: true,
    wheel: true,
    startScale: 0.8,
    maxScale: 3,
    minScale: 0.3
  },
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true
  },
});

//definimos los bloques con json pq soy un vago xd.
//se me complica la manera "normal"
Blockly.defineBlocksWithJsonArray([
  {
    "type": "crear_obj",//el bloque de crear un clásico
    "message0": "crear %1 con id : %2",
    "args0": [
      { 
        "type": "field_dropdown", 
        "name": "create_type", 
        "options": [["cubo", "cubo"], ["cono", "cono"]] 
      },
      {
        "type": "input_value",
        "name": "id_obj",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 1
  },
  {
    "type": "al_iniciar",//un bloque de cabezera que hice por hacer
    "message0": "Al iniciar el juego",
    "nextStatement": null,
    "colour": 180
  },
  {
    "type": "cambiar_eje",//para cambiar las coords (x, y, z)
    "message0": "cambiar %1 de %2 para %3",
    "args0":[
      {
        "type": "field_dropdown",
        "name": "eje_a_cambiar",
        "options" : [
          ["x", "x"],//los ejes xd
          ["y", "y"],
          ["z", "z"]
        ]
      },
      {
        "type": "input_value",
        "name": "id_obj",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "valor_eje_cambiar",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": true,
    "colour": 1
  },{
  "type": "forever",// un bucle indispensable xd
  "message0": "por siempre %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "DO"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 120,
  "tooltip": "Repite para siempre"
},{
  "type": "start",
  "message0": "inicio",
  "nextStatement": null,
  "colour": 160,
  "deletable": false
},{
  "type": "end",
  "message0": "fin",
  "previousStatement": null,
  "colour": 20
}
]);

//ACA PROGRAMAMOS LOS BLOQUES
/* dato curioso: 
este bloque de forever antes era un while(true),
para los que saben eso daba pesimo rendimiento,
lo cambie por una funcion con requestFrame.

Luego de eso no podias poner dos forever porque,
se creaban dos funciones iguales asi que,
les puse un id random al crear un bucle(ej: function loop_random();)
*/
javascript.javascriptGenerator.forBlock['forever'] = function(block, generator) {
  javascript.javascriptGenerator.forBlock['forever'].counter = 
    (javascript.javascriptGenerator.forBlock['forever'].counter || 0) + 1;
  
  const id = javascript.javascriptGenerator.forBlock['forever'].counter;
  const innerCode = generator.statementToCode(block, 'DO');
  
  return `
    function loop_${id}(){
      ${innerCode}
      requestAnimationFrame(loop_${id});
    }\n
    loop_${id}();
  `;
};

//el bloque de crear xd(todas estas funciones son de objects)

javascript.javascriptGenerator.forBlock['crear_obj'] = function(block, generator) {
  const type = block.getFieldValue('create_type');
  const id = generator.valueToCode(block, 'id_obj', generator.ORDER_ATOMIC) || '"default"';
  return `crearObjeto("${type}", ${id});\n`; 
};

//la cabezera q puse por poner
javascript.javascriptGenerator.forBlock['al_iniciar'] = function(block, generator) {
  const codigoSiguiente = generator.statementToCode(block, 'SUBSTACK');
  
  const listaVariables = block.workspace.getAllVariables();
  let declaraciones = '';
  
  if (listaVariables.length > 0) {
    declaraciones = 'let ' + listaVariables.map(v => v.name).join(', ') + ';\n';
  }

  return `// --- Inicio del Juego ---\n${declaraciones}${codigoSiguiente}`;
};
//sistema de variables, no lo hize yo para que matarte si blockly tiene uno.
javascript.javascriptGenerator.forBlock['variables_get'] = function(block, generator) {
  
  const variableName = block.getFieldValue('VAR');
  return [variableName, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['variables_set'] = function(block, generator) {
  
  const variableName = block.getFieldValue('VAR');
  const argument0 = generator.valueToCode(block, 'VALUE', javascript.Order.ASSIGNMENT) || '0';
  
  return variableName + ' = ' + argument0 + ';\n';
};

javascript.javascriptGenerator.forBlock['cambiar_eje'] = function(block, generator) {
  const eje = block.getFieldValue('eje_a_cambiar');
  const obj = generator.valueToCode(block, 'id_obj', generator.ORDER_ATOMIC);
  const valor = generator.valueToCode(block, 'valor_eje_cambiar', generator.ORDER_ADDITION) || '0';
  
  return `objectList["${obj}"].position.${eje} += ${valor};\n`;
}
//funciones de los botones para play & stop
function run_code(){
  let code = javascript.javascriptGenerator.workspaceToCode(workspace);
  eval(code);
}

function stop_code(){
  objectList.length = 0;
}
