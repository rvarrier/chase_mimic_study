//import psyanim and our base .psyn files
//import files from the psyanim drive (This JS file is saved inside .../testversion for me),
// hence the whole location of psyn files
import {fromSaveStr} from "/Users/f0053cz/Documents/GitHub/psyanim/psyanim/src/js/components/utils/SaveLoad";
import dataStr from "/Users/f0053cz/Documents/psyanim_notapp/psyanim_notapp_new_mimic_expt/test_version/base_stim_mimic_predBlack.psyn";
import VideoExporter from "/Users/f0053cz/Documents/GitHub/psyanim/psyanim/src/js/components/utils/VideoExporter";
let world = fromSaveStr(dataStr);
console.log(world)
let exportOptions = {
 //exportPath: "./vids/mimictest.webm",
  exportPath: "/Users/f0053cz/Documents/psyanim_notapp/psyanim_notapp_new_mimic_expt/test_version/vids/mimic/mimic_.webm",
  variationGroups: [],
  frameRate: 30,
  motionBlurFrames: 0,
  quality: 1,
  numRecollapses: 0, // DON'T change this to 2 in the final version
  doExportState: true,
  doExportPsyn: true,
  doExportCheat: true
};

// IMPORTANT THING TO CHECK: Are cheat and non-cheat versions the same motion trajectory? (otherwise cheat)
// doesn't make sense.

// 6 subtlety variations (we use "wander" in lieu of 180)
let subtletyVariations = [];
for(let subtlety of [0, 30, 60, 90, 120, 150]){
  subtletyVariations.push( 
    [
      {motiv: "predator-motiv", param: "subtlety", val: subtlety}
    ]
  );
}

// load json file which has 72 random (x,y) coordinates within the world
const dataArray = require('./mimic_start_position.json')
const dataObj = JSON.parse(dataArray); // each coordinate is dataObj.x[i], dataObj.y[i]

// assign the loaded random initial positions to true prey
let truePreyPosVariations = [];
let nvals = dataObj.x.length // e.g. 72
for (let i = 0; i < nvals; i++){
    truePreyPosVariations.push(
      [
        {motiv: "initMotiv_invisPreyAgent", param: "initPos_x", val: dataObj.x[i]},
        {motiv: "initMotiv_invisPreyAgent", param: "initPos_y", val: dataObj.y[i]}
      ]
    );
  
}

// variations for the cheat and non-cheat (main) versions to be saved
let truePreyVisibilityVariations = [
  [
    {motiv: "set-prey-visibility-motiv", param: "visible", val: true, label: "Cheat"}
  ],
  [
    {motiv: "set-prey-visibility-motiv", param: "visible", val: false, label: "Main" }
  ]
];

// 2 starting positions for the predator and mimicking agent (in addition to the original position)
// NOTE: used in case of the "MIMIC" category
let posPredatorMimicVariations = [
    [
      {motiv: "initMotiv_predAgent", param: "initPos_x", val: 350},
      {motiv: "initMotiv_predAgent", param: "initPos_y", val: 450},
      {motiv: "initMotiv_fakePreyAgent", param: "initPos_x", val: 850},
      {motiv: "initMotiv_fakePreyAgent", param: "initPos_y", val: 450}
    ],
    [
      {motiv: "initMotiv_predAgent", param: "initPos_x", val: 850},
      {motiv: "initMotiv_predAgent", param: "initPos_y", val: 450},
      {motiv: "initMotiv_fakePreyAgent", param: "initPos_x", val: 350},
      {motiv: "initMotiv_fakePreyAgent", param: "initPos_y", val: 450}
    ]
];

// color variations for predator and mimicking agent 
// NOTE: that "black" and "grey" are the names of faces created within the GUI
// same goes for "setPredatorFace" and "setPreyFace", which are motivators created within the GUI
let colorVariations = [
  [
    // this is a variation with the predator black and the mimicker grey
    {motiv: "setPredatorFace", param: "face", val: "black"},
    {motiv: "setFakePreyFace", param: "face", val: "grey"},
  ],
  [
    // this is a variation with the predator grey and the mimicker black
    {motiv: "setPredatorFace", param: "face", val: "grey"},
    {motiv: "setFakePreyFace", param: "face", val: "black"},
  ]
];

let ind = 0 // to loop through the random initial prey positions
for(let var_i of subtletyVariations) { // 0,30,...150
  for(let var_j of posPredatorMimicVariations){ // pred start position left or right
    
    //for use in file name
    const pred_xpos = var_j[0] //object for initpos_x
    const last_ind = pred_xpos.param.length-1
    
    for(let var_l of colorVariations){ //pred color black or grey
        
      for(let pos=0; pos<3;pos++) { // 3 variants with different start position
        console.log("start position ind:" + ind)
        let var_k = truePreyPosVariations[ind]; // set a random start position
        ind++;

        console.log("pred_subt" + var_i[0].val + '_Color' + var_l[0].val[0] + '_Pos' + pred_xpos.param[last_ind] + pred_xpos.val + "_ind" + ind)
        
        let varGroup = {
          //name: "mimic_subt" + var_i[0].val + 'pred' + var_m[0].label + "_",
          name: "pred_subt" + var_i[0].val + '_Color' + var_l[0].val[0] + '_Pos' + pred_xpos.param[last_ind] + "_" + pred_xpos.val + "_ind" + ind,
          variations: [
            //...var_m,
            ...var_i, 
            ...var_j, 
            ...var_k, 
            ...var_l,
          ]
        }
      
        exportOptions.variationGroups.push(varGroup);
        //}
      }
      }
    //}
  }
}

VideoExporter.exportAll(world, exportOptions);