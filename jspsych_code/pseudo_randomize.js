
function pseudo_randomize_fn() {//const dataArray = require('/expt_material/randomization/stimInfo.json')
    //const dataArray = require('/Users/f0053cz/Documents/GitHub/chase_mimic_study/jspsych_implementation/expt_material/randomization/stimInfo.json');
    //var dataObj = JSON.parse(stimInfo_dataArray); // each coordinate is dataObj.x[i], dataObj.y[i]
    //console.log(Object.keys(dataObj))

    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }


    //Method: 1. for each sub, select one main version. i.e.,
    version_chase = [1, 1, 1, 2, 2, 2]
    version_chase = shuffle(version_chase) // which version for each subtelty - chase
    version_mimic = [1, 1, 1, 2, 2, 2]
    version_mimic = shuffle(version_mimic) // which version for each subtelty - mimic
    version_wander = [1, 2]
    version_wander = shuffle(version_wander) // which version for chase and mimic 180 deg

    function random_item(items) { return items[Math.floor(Math.random() * items.length)]; }

    trial_types = ['Chase', 'Mimic', 'Wander'];

    function getAllIndexes(val, arr_limits) {
        var indexes = [], i;
        for (i = arr_limits[0]; i < arr_limits[1]; i++) {
            //for(i = arr_limits[0]; i < 5; i++){
            //version_ind = random_item([0,1]) //random.randint(0,1) # 0
            //console.log(i)
            //console.log(true && true)
            //console.log(dataObj.Subtlety[i], dataObj.Iter_nr[i], dataObj.Motivator[i])
            //console.log(val[0], 'v' + String(val[1]), trial_types[val[2]])
            //console.log(  (dataObj.Subtlety[i] == val[0]),   (dataObj.Iter_nr[i] == 'v' + String(val[1])),     (dataObj.Motivator[i] == trial_types[val[2]]))
            conditions = ((dataObj.Subtlety[i] == val[0]) && (dataObj.Iter_nr[i] == 'v' + String(val[1])) && (dataObj.Motivator[i] == trial_types[val[2]]))
            //console.log('conditions',conditions)
            if (conditions === true) {
                //console.log(i)
                indexes.push(i);
            }
            //console.log('Indexes', indexes)
        }
        return indexes;
    }

    stim_list = []

    for (subt = 0; subt < 151; subt = subt + 30) { //subt in [0,30,60,90,120,150]:
        for (t = 0; t < 2; t++) { //: # chase/mimic
            if (t == 0) {
                arr_limits = [0, 48]
            } else {
                arr_limits = [48, 96]
            }
            version_ind = random_item([0, 1]) //random.randint(0,1) # 0 or 1
            rows = getAllIndexes([subt, version_ind, t], arr_limits)
            stim_list.push.apply(stim_list,rows);

            if (version_ind == 0) {
                alt_version = 1;
            }
            if (version_ind == 1) {
                alt_version = 0;
            }
            rows = getAllIndexes([subt, alt_version, t], arr_limits); //(df['Subtlety'] == subt) & (df['Iter_nr'] == 'v1') & (df['Motivator']==trial_type)
            subset = shuffle(rows).slice(0, 2);//random.sample(list(np.where(rows)[0]),2)// for the second version, pick 2
            //console.log('subset:', subset)
            stim_list.push.apply(stim_list,subset);
        }
    }

    //console.log('wander')
    version_ind = random_item([0, 1]) //random.randint(0,1) # 1 or 2
    t = 2
    arr_limits = [96, 112];

    rows = getAllIndexes([180, version_ind, t], arr_limits) // (df['Motivator'] == 'Wander') & (df['Iter_nr'] == str('v'+str(version_ind)))
    //console.log(rows)
    stim_list.push(rows);

    //console.log('alt wander')
    if (version_ind == 0) {
        alt_version = 1;
    }
    if (version_ind == 1) {
        alt_version = 0;
    }
    rows = getAllIndexes([180, alt_version, t], arr_limits); //(df['Subtlety'] == subt) & (df['Iter_nr'] == 'v1') & (df['Motivator']==trial_type)
    subset = shuffle(rows).slice(0, 4);//random.sample(list(np.where(rows)[0]),2)// for the second version, pick 2
    //console.log('subset:', subset)
    stim_list.push(subset);

    return stim_list

    /*print(np.where(rows)[0])
    if version_ind == 0:
        rows = (df['Iter_nr'] == 'v1') & (df['Motivator']=='Wander')
        print(trial_type, np.where(rows)[0])
    elif version_ind == 1:
        rows = (df['Iter_nr'] == 'v0') & (df['Motivator']=='Wander')
        print(trial_type, np.where(rows)[0])
    subset = random.sample(list(np.where(rows)[0]),4) # pick 4 out of the remaining 8 (2 for 180 chase, 2 for 180 mimic)
    print(subset) 
    stim_list.extend(subset)
    
    stim_list.extend(np.where(rows)[0])
    print(stim_list, len(stim_list))*/
}