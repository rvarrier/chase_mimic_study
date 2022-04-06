//import psyanim and our base .psyn files
import { fromSaveStr } from "/Users/f0053cz/Documents/GitHub/psyanim/psyanim/src/js/components/utils/SaveLoad";
import dataStr from "/Users/f0053cz/Documents/GitHub/chase_mimic_study/test_version/base_stim_chase_predBlack.psyn";
//import dataStr from "/Users/f0053cz/Documents/psyanim_notapp/psyanim_notapp_new_mimic_expt/test_version/base_stim_chase_predGrey.psyn";
import VideoExporter from "/Users/f0053cz/Documents/GitHub/psyanim/psyanim/src/js/components/utils/VideoExporter";


let condition = 'redo_bad'; //'all'
var export_path;

if (condition == 'redo_bad') {
  //console.log('in redo')
  export_path = "/Users/f0053cz/Documents/GitHub/chase_mimic_study/test_version/vids/chase2/chase_.webm";
}// else {
//  console.log('not in redo')
//}
if (condition == 'all') {
  //console.log('in all');
  export_path = "/Users/f0053cz/Documents/GitHub/chase_mimic_study/test_version/vids/chase2/chase_test_.webm";
}



let world = fromSaveStr(dataStr);
console.log(world)
let exportOptions = {
  //exportPath: "./vids/mimictest.webm",
  exportPath: export_path,
  //exportPath: "/Users/f0053cz/Documents/psyanim_notapp/psyanim_notapp_new_mimic_expt/test_version/vids/chase/chase_.webm",
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
for (let subtlety of [0, 30, 60, 90, 120, 150]) {
  subtletyVariations.push(
    [
      { motiv: "predator-motiv", param: "subtlety", val: subtlety }
    ]
  );
}

// 2 positions for the predator and prey agents (in addition to the original position)
// NOTE: used in case of the "MIMIC" category
let posPredatorPreyVariations = [
  [
    { motiv: "initMotiv_predAgent", param: "initPos_x", val: 350 },
    { motiv: "initMotiv_predAgent", param: "initPos_y", val: 450 },
    { motiv: "initMotiv_preyAgent", param: "initPos_x", val: 850 },
    { motiv: "initMotiv_preyAgent", param: "initPos_y", val: 450 }
  ],
  [
    { motiv: "initMotiv_predAgent", param: "initPos_x", val: 850 },
    { motiv: "initMotiv_predAgent", param: "initPos_y", val: 450 },
    { motiv: "initMotiv_preyAgent", param: "initPos_x", val: 350 },
    { motiv: "initMotiv_preyAgent", param: "initPos_y", val: 450 }
  ]
];

let bad_root_filenames = ['pred_subt60_Grey_Posx_350', 'pred_subt0_Black_Posx_850']

for (let var_i of subtletyVariations) { //0,30,...150
  for (let var_j of posPredatorPreyVariations) {// LR or RL
    const pred_xpos = var_j[0] //object for initpos_x
    const last_ind = pred_xpos.param.length - 1
    let flname = "pred_subt" + var_i[0].val + '_Black_Pos' + pred_xpos.param[last_ind] + "_" + pred_xpos.val
    console.log(flname)
    let make_file = (condition == 'redo_bad') && (bad_root_filenames.includes(flname));//.find(element => flname))
    console.log('make_file', make_file)
    if (make_file) {


      let varGroup = {
        name: flname,
        variations: [
          ...var_i,
          ...var_j,
        ]
      }
      exportOptions.variationGroups.push(varGroup);
    }

  }
}

VideoExporter.exportAll(world, exportOptions);