import {fromSaveStr} from "/Users/f0053cz/Documents/GitHub/psyanim/src/js/components/utils/SaveLoad";
import dataStr from "./base_stim_mimic.psyn";
import VideoExporter from "/Users/f0053cz/Documents/GitHub/psyanim/src/js/components/utils/VideoExporter";
let world = fromSaveStr(dataStr);
let exportOptions = {
  exportPath: "./vids/mimictest.webm",
  variationGroups: [],
  frameRate: 30,
  motionBlurFrames: 0,
  quality: 1,
  numRecollapses: 0,
  doExportState: true,
  doExportPsyn: false,
  doExportCheat: false
};

let subtletyVariations = [];
for(let subtlety of [0, 30, 60, 90, 120, 150]){
  subtletyVariations.push( 
    [
      {motiv: "predator-motiv", param: "subtlety", val: subtlety}
    ]
  );
}

const dataArray = require('./mimic_start_position.json')
const dataObj = JSON.parse(dataArray); // each coordinate is dataObj.x[i], dataObj.y[i]

let truePreyPosVariations = [];
//let rows = 6, cols = 4; 
//let gridW = world.width / cols;
//let gridH = world.height / rows;
let nvals = dataObj.x.length // e.g. 48
//for(let row = 0; row<rows; row++){
// for(let col = 0; col <cols; col++){
for (let i = 0; i < nvals; i++){
    truePreyPosVariations.push(
      [
        //{motiv: "initMotiv_truePrey", param: "initPos_x", val: col * gridW + Math.random() * gridW},
        //{motiv: "initMotiv_truePrey", param: "initPos_y", val: row * gridH + Math.random() * gridH}
        {motiv: "initMotiv_truePrey", param: "initPos_x", val: dataObj.x[i]},
        {motiv: "initMotiv_truePrey", param: "initPos_y", val: dataObj.y[i]}
      ]
    );
  
}

let truePreyVisibilityVariations = [
  [
    {motiv: "setTruePreyVisibility", param: "visible", val: true, label: "truePreyVisible"}
  ],
  [
    {motiv: "setTruePreyVisibility", param: "visible", val: false, label: "truePreyInvisible" }
  ]
];

// 2 positions for the predator and mimicking agent (in addition to the original position)
// NOTE: used in case of the "MIMIC" category
let posPredatorMimicVariations = [
    [
      {motiv: "initMotiv_predator", param: "initPos_x", val: 300},
      {motiv: "initMotiv_predator", param: "initPos_y", val: 200},
      {motiv: "initMotiv_mimickingAgent", param: "initPos_x", val: 600},
      {motiv: "initMotiv_mimickingAgent", param: "initPos_y", val: 200}
    ],
    [
      {motiv: "initMotiv_predator", param: "initPos_x", val: 600},
      {motiv: "initMotiv_predator", param: "initPos_y", val: 200},
      {motiv: "initMotiv_mimickingAgent", param: "initPos_x", val: 300},
      {motiv: "initMotiv_mimickingAgent", param: "initPos_y", val: 200}
    ]
];

// 2 positions for the predator and true prey 
// (in addition to the original position)
// NOTE: used in case of the "CHASE" category
let posPredatorPreyVariations = [
  [
    {motiv: "initMotiv_predator", param: "initPos_x", val: 300},
    {motiv: "initMotiv_predator", param: "initPos_y", val: 200},
    {motiv: "initMotiv_truePrey", param: "initPos_x", val: 600},
    {motiv: "initMotiv_truePrey", param: "initPos_y", val: 200}
  ],
  [
    {motiv: "initMotiv_predator", param: "initPos_x", val: 600},
    {motiv: "initMotiv_predator", param: "initPos_y", val: 200},
    {motiv: "initMotiv_truePrey", param: "initPos_x", val: 300},
    {motiv: "initMotiv_truePrey", param: "initPos_y", val: 200}
  ]
];


// color variations for predator and mimicking agent 
// NOTE: that "black" and "grey" are the names of faces created within the GUI
// same goes for "setPredatorFace" and "setPreyFace", which are motivators created within the GUI
let colorVariations = [
  [
    // this is a variation with the predator black and the mimicker grey
    {motiv: "setPredatorFace", param: "face", val: "black"},
    {motiv: "setPreyFace", param: "face", val: "grey"},
  ],
  [
    // this is a variation with the predator grey and the mimicker black
    {motiv: "setPredatorFace", param: "face", val: "grey"},
    {motiv: "setPreyFace", param: "face", val: "black"},
  ]
];

const existingIDs = [];
const getRandomLetters = (length = 1) => Array(length).fill().map(e => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join('');
const getRandomDigits = (length = 1) => Array(length).fill().map(e => Math.floor(Math.random() * 10)).join('');
const generateUniqueID = () => {
  let id = getRandomLetters(2) + getRandomDigits(4);
  while (existingIDs.includes(id)) id = getRandomLetters(2) + getRandomDigits(4);
  return id;
};

//  "MIMIC" CATEGORY --------
// these variations will be used to create the group of variations for the first category
/*
  subtletyVariations,
  posPredatorMimicVariations,
  truePreyPosVariations,
  truePreyVisibilityVariations,
  colorVariations
*/
for(let var_i of subtletyVariations) {
  for(let var_j of posPredatorMimicVariations){
    //for(let var_k of truePreyPosVariations){
      for(let var_l of colorVariations){
        for(let var_m of truePreyVisibilityVariations){
        
          let newId = generateUniqueID();
          existingIDs.push(newId);
          let varGroup = {
            name: "MIMIC_" + var_m[0].label + "_" + newId,
            variations: [
              ...var_m,
              ...var_i, 
              ...var_j, 
              //...var_k, 
              ...var_l,
            ]
          }
          exportOptions.variationGroups.push(varGroup);
        }
      }
    //}
  }
}

// CHASE category
// these variations will be used to create the group of variations for the second category "CHASE"
/*
  subtletyVariations,
  posPredatorPreyVariations
  colorVariations
*/

let var_hide_mimickingAgent = {motiv: "setMimickingAgentVisibility", "param": "visible", val: false};
for(let var_i of subtletyVariations) {
  for(let var_j of posPredatorPreyVariations){
      for(let var_l of colorVariations){
        let newId = generateUniqueID();
        existingIDs.push(newId);
        let varGroup = {
          name: "CHASE_" + newId,
          variations: [
            var_hide_mimickingAgent,
            ...var_i, 
            ...var_j, 
            ...var_l,
          ]
        }
        exportOptions.variationGroups.push(varGroup);
    }
  }
}

VideoExporter.exportAll(world, exportOptions);