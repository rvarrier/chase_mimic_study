//console.log(btn)
//console.log('btn', btn.checked)

/*slid.addEventListener("change", () => {
    console.log('slid moved')
    console.log(slid.value);
})*/

/*display_element
   .querySelector("#jspsych-image-slider-response-response")
    .addEventListener("mousedown", enable_button);
display_element
    .querySelector("#jspsych-image-slider-response-response")
    .addEventListener("touchstart", enable_button);
display_element
    .querySelector("#jspsych-image-slider-response-response")
    .addEventListener("change", enable_button);*/
    
//}


//callback_function = jsPsych.finishTrial()
/*on_interaction_data_update: function () {
    console.log('trial start.')
    flag = 0
    i = 0
    while (i < 1000) {
        i++;
        console.log(i)
        let target = document.querySelectorAll('input[name="q2"]');//document.getElementById("ID_grey").elements;
        if (target.checked) {//(jsPsych.pluginAPI.clickTarget(target, 0 )) {
            console.log('test')
            jsPsych.endExperiment('The experiment was ended.');
            break;
        }
    }
}*/


<script>  for (let radioButton of ["ID_black","ID_grey"]) {if (radioButton.checked) {jsPsych.finishTrial()} }

var interaction_data = jsPsych.data.getInteractionData();
          console.log('interaction_data.json()', interaction_data.json());

conditional_function: function () {
                if (document.querySelector('input[name="q2"]')) {
                    document.querySelectorAll('input[name="q2"]').forEach((elem) => {
                        elem.addEventListener("change", function (event) {
                            console.log('test')
                            var item = event.target.value;
                            console.log(item);
                        });
                    });
                }
            }