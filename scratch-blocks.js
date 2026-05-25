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

Blockly.defineBlocksWithJsonArray([
  {
    "type": "crear_obj",
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
    "type": "al_iniciar",
    "message0": "Al iniciar el juego",
    "nextStatement": null,
    "colour": 180
  },
  {
    "type": "cambiar_eje",
    "message0": "cambiar %1 de %2 para %3",
    "args0":[
      {
        "type": "field_dropdown",
        "name": "eje_a_cambiar",
        "options" : [
          ["x", "x"],
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
  "type": "forever",
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

javascript.javascriptGenerator.forBlock['crear_obj'] = function(block, generator) {
  const type = block.getFieldValue('create_type');
  const id = generator.valueToCode(block, 'id_obj', generator.ORDER_ATOMIC) || '"default"';
  return `crearObjeto("${type}", ${id});\n`; 
};

javascript.javascriptGenerator.forBlock['al_iniciar'] = function(block, generator) {
  const codigoSiguiente = generator.statementToCode(block, 'SUBSTACK');
  
  const listaVariables = block.workspace.getAllVariables();
  let declaraciones = '';
  
  if (listaVariables.length > 0) {
    declaraciones = 'let ' + listaVariables.map(v => v.name).join(', ') + ';\n';
  }

  return `// --- Inicio del Juego ---\n${declaraciones}${codigoSiguiente}`;
};

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

function run_code(){
  let code = javascript.javascriptGenerator.workspaceToCode(workspace);
  console.log(code);
}

function stop_code(){
  objectList.length = 0;
}