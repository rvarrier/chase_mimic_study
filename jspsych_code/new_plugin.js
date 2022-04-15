var jsPluginName = (function (jspsych) {
    "use strict";
  
    const info = {
      name: "slider-radio",
      parameters: {
        slider_Q1: {
          type: jspsych.ParameterType.STRING,
          default: undefined,
        },
        require_movement_Q1: {
          type: jspsych.ParameterType.IMAGE,
          default: undefined,
        },
        slider_labels_Q1: {
          type: jspsych.ParameterType.IMAGE,
          default: undefined,
        },
        prompt_Q2: {
            type: jspsych.ParameterType.STRING,
            default: undefined,
          },
        options_Q2: {
            type: jspsych.ParameterType.STRING,
            default: undefined,
          },
        horizontal_Q2: {
            type: jspsych.ParameterType.STRING,
            default: undefined,
          },,
        required_Q2: {
            type: jspsych.ParameterType.STRING,
            default: undefined,
          },
      },
    };
  
    /**
     * **PLUGIN-NAME**
     *
     * SHORT PLUGIN DESCRIPTION
     *
     * @author YOUR NAME
     * @see {@link https://DOCUMENTATION_URL DOCUMENTATION LINK TEXT}
     */
    class PluginNamePlugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
        // data saving
        var trial_data = {
          parameter_name: "parameter value",
        };
        // end trial
        this.jsPsych.finishTrial(trial_data);
      }
    }
    PluginNamePlugin.info = info;
  
    return PluginNamePlugin;
  })(jsPsychModule);