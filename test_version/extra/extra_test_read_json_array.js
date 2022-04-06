// to test if a javascript code works fine, save it here and 
// On Terminal/command prompt, run node **this filename** (maybe a different command in Windows)
let posPredatorMimicVariations = [
    [
      {motiv: "initMotiv_predAgent", param: "initPos_x", val: 300},
      {motiv: "initMotiv_predAgent", param: "initPos_y", val: 200},
      {motiv: "initMotiv_fakePreyAgent", param: "initPos_x", val: 600},
      {motiv: "initMotiv_fakePreyAgent", param: "initPos_y", val: 200}
    ],
    [
      {motiv: "initMotiv_predAgent", param: "initPos_x", val: 600},
      {motiv: "initMotiv_predAgent", param: "initPos_y", val: 200},
      {motiv: "initMotiv_fakePreyAgent", param: "initPos_x", val: 300},
      {motiv: "initMotiv_fakePreyAgent", param: "initPos_y", val: 200}
    ]
]
const pred_xparam = posPredatorMimicVariations[0][0]
console.log(pred_xparam.param + '_' + pred_xparam.param[pred_xparam.param.length-1])
/*const dataArray = require('./mimic_start_position.json')
const dataObj = JSON.parse(dataArray);
console.log(typeof(dataObj.y[0]));
console.log(dataObj.y.length)
console.log(typeof(dataObj),dataObj.count); */


/*import {readNumpyFile} from 'read-npy-file';
const dataArray = readNumpyFile('mimic_start_position.npy')
console.log(
    {
        // The DataArray result
        dataArray,
        // 'typedArray' is a TypedArray. see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
        typedArray: dataArray.typedArray,
        // The shape of the numpy array
        shape: dataArray.shape,
        // Converts the flat TypedArray into a nested normal array equivalent to what it would be in python.
        array: dataArray.toArray(),
        // Converts to json string.
        json: dataArray.toJson(),
    }
)
*/

