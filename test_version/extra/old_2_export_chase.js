//import psyanim and our base .psyn files
import {fromSaveStr} from "/Users/f0053cz/Documents/GitHub/psyanim/psyanim/src/js/components/utils/SaveLoad";
import dataStr from "/Users/f0053cz/Documents/psyanim_notapp/psyanim_notapp_new_mimic_expt/test_version/base_stim_chase.psyn";
import VideoExporter from "/Users/f0053cz/Documents/GitHub/psyanim/psyanim/src/js/components/utils/VideoExporter";
let world = fromSaveStr(dataStr);
console.log(world)
let exportOptions = {
  //exportPath: "./vids/mimictest.webm",
  exportPath: "/Users/f0053cz/Documents/psyanim_notapp/psyanim_notapp_new_mimic_expt/test_version/vids/chase/chase_.webm",
  variationGroups: [],
  frameRate: 30,
  motionBlurFrames: 0,
  quality: 1,
  numRecollapses: 2, // change this to 2 in the final version
  doExportState: true,
  doExportPsyn: true,
  doExportCheat: false
};

let subtletyVariations = [];
for(let subtlety of [0, 30, 60, 90, 120, 150])
{
  subtletyVariations.push( 
    [
      {motiv: "predator-motiv", param: "subtlety", val: subtlety}
    ]
  );
}

// 2 positions for the predator and prey agents (in addition to the original position)
// NOTE: used in case of the "MIMIC" category
let posPredatorPreyVariations = [
    [
      {motiv: "initMotiv_predAgent", param: "initPos_x", val: 350},
      {motiv: "initMotiv_predAgent", param: "initPos_y", val: 450},
      {motiv: "initMotiv_preyAgent", param: "initPos_x", val: 850},
      {motiv: "initMotiv_preyAgent", param: "initPos_y", val: 450}
    ],
    [
      {motiv: "initMotiv_predAgent", param: "initPos_x", val: 850},
      {motiv: "initMotiv_predAgent", param: "initPos_y", val: 450},
      {motiv: "initMotiv_preyAgent", param: "initPos_x", val: 350},
      {motiv: "initMotiv_preyAgent", param: "initPos_y", val: 450}
    ]
];

// color variations for predator and mimicking agent 
// NOTE: that "black" and "grey" are the names of faces created within the GUI
// same goes for "setPredatorFace" and "setPreyFace", which are motivators created within the GUI
let colorVariations = [
  [
    // this is a variation with the predator black and the prey grey
    {motiv: "setPredatorFace", param: "face", val: "black"},
    {motiv: "setPreyFace", param: "face", val: "grey"},
  ],
  [
    // this is a variation with the predator grey and the prey black
    {motiv: "setPredatorFace", param: "face", val: "grey"},
    {motiv: "setPreyFace", param: "face", val: "black"},
  ]
];

for(let var_i of subtletyVariations) { //0,30,...150
  for(let var_j of posPredatorPreyVariations){// LR or RL
    const pred_xpos = var_j[0] //object for initpos_x
    const last_ind = pred_xpos.param.length-1
    //for(let var_k of truePreyPosVariations){
      for(let var_l of colorVariations){ // pred grey or black
        //for(let var_m of truePreyVisibilityVariations){
          
          console.log("pred_subt" + var_i[0].val + '_Color' + var_l[0].val[0] + '_Pos' + pred_xpos.param[last_ind] + "_" + pred_xpos.val)
          let varGroup = {
            name: "pred_subt" + var_i[0].val + '_Color' + var_l[0].val[0] + '_Pos' + pred_xpos.param[last_ind] + pred_xpos.val,
           variations: [
              //...var_m,
              ...var_i, 
              ...var_j, 
              //...var_k, 
              ...var_l,
            ]
          }
          exportOptions.variationGroups.push(varGroup);
        //}
      }
    //}
  }
}

VideoExporter.exportAll(world, exportOptions);