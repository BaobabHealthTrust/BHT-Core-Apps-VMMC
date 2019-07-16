
var currentTime = moment().format(' HH:mm:ss');
var tstCurrentDate = moment(tstCurrentDate).format("YYYY-MM-DD");
var patientID = sessionStorage.patientID;
var patientID = sessionStorage.getItem("patientID");
var programID = sessionStorage.getItem("programID");
var patientAge = sessionStorage.patientAge;
var tt_cancel_destination = "/views/patient_dashboard.html?patient_id=" + patientID;

var x = {"FOLLOW UP" : {
    	"Pain": null,
    	"Bleeding": null,
    	"Haematoma": null,
    	"Swelling": null,
    	"Glans damage": null,
    	"Infection": null,
    	"Wound disruption": null,
    	"Urinary problems": null
    }};

	var sideEffectsHash = [];
      sideEffectsHash['Pain'] = {none: '', mild: '', mod: '', sev: ''}
      sideEffectsHash['Bleeding'] = {none: '', mild: '', mod: '', sev: ''}
      sideEffectsHash['Haematoma'] = {none: '', mild: '', mod: '', sev: ''}
      sideEffectsHash['Swelling'] = {none: '', mild: '', mod: '', sev: ''}
      sideEffectsHash['Glans damage'] = {none: '', mild: '', mod: '', sev: ''}
      sideEffectsHash['Infection'] = {none: '', mild: '', mod: '', sev: ''}
      sideEffectsHash['Wound disruption'] = {none: '', mild: '', mod: '', sev: ''}
      sideEffectsHash['Urinary problems'] = {none: '', mild: '', mod: '', sev: ''}

function advancedSideEffects(){

    var sideEffectsArray = ['Pain','Bleeding','Haematoma','Swelling','Glans damage','Infection','Wound disruption','Urinary problems'];
  
    jQuery("#inputFrame" + tstCurrentPage).remove();
    jQuery("#helpText" + tstCurrentPage).css({
      marginLeft: "0%",
      fontWeight: "bold",
      fontSize: "1.9em"
    })

    html = "<div id='divcontent'>";
    html += "<div id='divScroller'>";
    // var sideEffectsOptions = "JSON.parse('[&quot;Pain&quot;,&quot;Bleeding&quot;,&quot;Haematoma&quot;,&quot;Swelling&quot;,&quot;Glans damage&quot;,&quot;Infection&quot;,&quot;Wound disruption&quot;,&quot;Urinary problems&quot;]');";
    html += "<table cellspacing='1' cellpadding='2' width='95%' id='yes_no_table'>";
    html += "<tbody>";


    for (var i=0; i<=sideEffectsArray.length - 1; i++){

      html += "<tr>";
      html += "<td class='labelText'>" + sideEffectsArray[i] + "</td>";

      
      html += "<td style='width: 30%;'>";
      html += "<table style='float: right; width: 100%; padding-right: 10px;' class='btn-table'>";
      html += "<tr>";
      
      html += "<td>";
      html += "<div class='switch switch-none' id='none_btn_container_" + sideEffectsArray[i].toLowerCase() + "' category='none' ";
      html += "key='" + sideEffectsArray[i].toLowerCase() + "' onmousedown='clicked(this);'>";
      html += "<input class='hidden-checkbox' id='none_checkbox_" + sideEffectsArray[i].toLowerCase() + "' type='checkbox'>";
      html +="<label id='none_lable_" + sideEffectsArray[i].toLowerCase() + "'><i></i></label>";
      html += "</td>";
     
      html += "<td>";
      html += "<div class='switch switch-mild' id='mild_btn_container_" + sideEffectsArray[i].toLowerCase() + "' category='mild' ";
      html += "key='" + sideEffectsArray[i].toLowerCase() + "' onmousedown='clicked(this);'>";
      html += "<input class='hidden-checkbox' id='mild_checkbox_" + sideEffectsArray[i].toLowerCase() + "' type='checkbox'>";
      html +="<label id='mild_lable_" + sideEffectsArray[i].toLowerCase() + "'><i></i></label>";
      html += "</td>";

      html += "<td>";
      html += "<div class='switch switch-mod' id='mod_btn_container_" + sideEffectsArray[i].toLowerCase() + "' category='moderate' ";
      html += "key='" + sideEffectsArray[i].toLowerCase() + "' onmousedown='clicked(this);'>";
      html += "<input class='hidden-checkbox' id='mod_checkbox_" + sideEffectsArray[i].toLowerCase() + "' type='checkbox'>";
      html +="<label id='mod_lable_" + sideEffectsArray[i].toLowerCase() + "'><i></i></label>";
      html += "</td>";

      html += "<td>";
      html += "<div class='switch switch-sev' id='sev_btn_container_" + sideEffectsArray[i].toLowerCase() + "' category='severe' ";
      html += "key='" + sideEffectsArray[i].toLowerCase() + "' onmousedown='clicked(this);'>";
      html += "<input class='hidden-checkbox' id='sev_checkbox_" + sideEffectsArray[i].toLowerCase() + "' type='checkbox'>";
      html +="<label id='sev_lable_" + sideEffectsArray[i].toLowerCase() + "'><i></i></label>";
      html += "</td>";
     
      html += "</tr>";
      html += "</table>";
      html += "</td>";
     
     
      html += "</tr>"
    }

    html += "<tbody>"
    html += "</table>";
    html += "</div>";
    html += "</div>";

    thisPage = document.getElementById('page' + tstCurrentPage);
    thisPage.innerHTML += html;

    preselectSelectedSideEffects();
    setBackButton();
    __$('nextButton').onmousedown = function(){
      validateSideEffectsInput();
    }
    
}

function validateSideEffectsInput(){
    // unselectedSideEffects = [];
    // for (var key in sideEffectsHash){
    //   sevValue = sideEffectsHash[key]["sev"];
    //   noneValue = sideEffectsHash[key]["none"];
    //   mildValue = sideEffectsHash[key]["mild"];
    //   modValue = sideEffectsHash[key]["mod"];
    //   console.log()
    //   if (sevValue.length == 0 && noneValue.length == 0 && mildValue.length == 0 && modValue.length == 0){
    //     //The row was not selected
    //     unselectedSideEffects.push(key);
    //   }
    // }

    // if (unselectedSideEffects.length > 0){
    //   showMessage("The following are not selected <br />" +  unselectedSideEffects.join('<br /> '));
    // }else{
      gotoNextPage();
    //}
}


// var follow_up_concepts = {"Pain": 1111, "Bleeding": 123, "None": 12, "Mild": 34}
// obs = {encounter: encounter.id,
// 		observations: []}
// if (x["FOLLOW-UP"]["Pain"] !== null){
// 	obs.observations.push({concept_id: follow_up_concepts["Pain"], value_coded: follow_up_concepts["FOLLOW-UP"]["Pain"]})
// }
// if (x["FOLLOW-UP"]["Bleeding"] !== null){
// 	obs.observations.push({concept_id: follow_up_concepts["Bleeding"], value_coded: follow_up_concepts["FOLLOW-UP"]["Bleeding"]})
// }

// console.log(obs);

function setBackButton(){
    backButton = jQuery('#backButton')[0];
    if (backButton){
      mouseEvent = backButton.getAttribute('onmousedown');
      if (mouseEvent){
        if (!mouseEvent.match(/resetNextButton/i)){
          onmousedownevent = backButton.getAttribute('onmousedown') + '; resetNextButton()';
          backButton.setAttribute('onmousedown', onmousedownevent);
        }
      }
    }
}

function preselectSelectedSideEffects(){

    for (var key in sideEffectsHash){
     
      noneValue = sideEffectsHash[key]["none"];
      mildValue = sideEffectsHash[key]["mild"];
      modValue = sideEffectsHash[key]["mod"];
      sevValue = sideEffectsHash[key]["sev"];

      buttons = jQuery("[key='" + key + "']");
      none_button = buttons[0];
      mild_button = buttons[1];
      mod_button = buttons[2];
      sev_button = buttons[3];


      divs = document.getElementsByClassName('switch');
      for(var i = 0; i < divs.length; i++){
        divKey = divs[i].getAttribute('key');

        if(key == divKey){
          if(noneValue.length > 0) {
            index = none_button.id.replace("none_btn_container_",'');
            hidden_checkbox_none = document.getElementById('none_checkbox_' + index);
            on_label_checkbox = document.getElementById('none_lable_' + index);
            on_label_checkbox.setAttribute('style','color: white; background-color: lightgreen;');
            hidden_checkbox_none.checked = true;
            break;
          }else if(mildValue.length > 0){
            index = mild_button.id.replace("mild_btn_container_",'');
            hidden_checkbox_mild = document.getElementById('mild_checkbox_' + index);
            on_label_checkbox = document.getElementById('mild_lable_' + index);
            on_label_checkbox.setAttribute('style','color: white; background-color: lightgreen;');
            hidden_checkbox_mild.checked = true;
            break;
          }else if(modValue.length > 0){
            index = mod_button.id.replace("mod_btn_container_",'');
            hidden_checkbox_mod = document.getElementById('mod_checkbox_' + index);
            on_label_checkbox = document.getElementById('mod_lable_' + index);
            on_label_checkbox.setAttribute('style','color: white; background-color: lightgreen;');
            hidden_checkbox_mod.checked = true;
            break;
          }else if(sevValue.length > 0){
            index = sev_button.id.replace("sev_btn_container_",'');
            hidden_checkbox_sev = document.getElementById('sev_checkbox_' + index);
            on_label_checkbox = document.getElementById('sev_lable_' + index);
            on_label_checkbox.setAttribute('style','color: white; background-color: lightgreen;');
            hidden_checkbox_sev.checked = true;
            break;
          }
        }
      }
 
    }
}

function clicked(e) {
    category = e.getAttribute('category');
    key = e.getAttribute('key');
    
    if(e.id.match(/none_btn_container_/i)) {
      //updateSideEffectNoneValue(e);
      index = e.id.replace("none_btn_container_",'');
      hidden_checkbox_mild = document.getElementById('mild_checkbox_' + index);
      hidden_checkbox_mod = document.getElementById('mod_checkbox_' + index);
      hidden_checkbox_sev = document.getElementById('sev_checkbox_' + index);
      hidden_checkbox_none = document.getElementById('none_checkbox_' + index);
 
      off_hidden_checkbox = document.getElementById('none_checkbox_' + index);
      on_label_checkbox = document.getElementById('none_lable_' + index);

      off_label_checkbox_mild = document.getElementById('mild_lable_' + index);
      off_label_checkbox_mod = document.getElementById('mod_lable_' + index);
      off_label_checkbox_sev = document.getElementById('sev_lable_' + index);

        off_hidden_checkbox.checked = false;
        off_label_checkbox_mild.setAttribute('style','color: black; background-color: ""');
        off_label_checkbox_mod.setAttribute('style','color: black; background-color: ""');
        off_label_checkbox_sev.setAttribute('style','color: black; background-color: ""');
        on_label_checkbox.setAttribute('style','color: white; background-color: lightgreen;');

        if(hidden_checkbox_mild.checked) 
        {
          hidden_checkbox_mild.checked = false;
        }else if (hidden_checkbox_mod.checked){
          hidden_checkbox_mod.checked = false;
        }else if (hidden_checkbox_sev.checked)
        {
           hidden_checkbox_sev.checked = false;
        }
        else
        {
           hidden_checkbox_none.checked = true;
        }


    }
    else if (e.id.match(/mild_btn_container_/i)) {
      //updateSideEffectMildValue(e);
      index = e.id.replace("mild_btn_container_",'');
      hidden_checkbox_none = document.getElementById('none_checkbox_' + index);
      hidden_checkbox_mod = document.getElementById('mod_checkbox_' + index);
      hidden_checkbox_sev = document.getElementById('sev_checkbox_' + index);
      hidden_checkbox_mild = document.getElementById('sev_checkbox_' + index);

      off_hidden_checkbox = document.getElementById('mild_checkbox_' + index);
      on_label_checkbox = document.getElementById('mild_lable_' + index);

      off_label_checkbox_none = document.getElementById('none_lable_' + index);
      off_label_checkbox_mod = document.getElementById('mod_lable_' + index);
      off_label_checkbox_sev = document.getElementById('sev_lable_' + index);

        off_hidden_checkbox.checked = false;
        off_label_checkbox_none.setAttribute('style','color: black; background-color: ""');
        off_label_checkbox_mod.setAttribute('style','color: black; background-color: ""');
        off_label_checkbox_sev.setAttribute('style','color: black; background-color: ""');
        on_label_checkbox.setAttribute('style','color: white; background-color: lightgreen;');
        

        if(hidden_checkbox_none.checked) 
        { 
          hidden_checkbox_none.checked = false;
        }else if (hidden_checkbox_mod.checked){
          hidden_checkbox_mod.checked = false;
        }else if (hidden_checkbox_sev.checked)
        {
           hidden_checkbox_sev.checked = false;
        }
        else
        {
           hidden_checkbox_mild.checked = true;
        }

    }
    else if (e.id.match(/mod_btn_container_/i)){
      //updateSideEffectModValue(e);
      index = e.id.replace("mod_btn_container_",'');
      hidden_checkbox_none = document.getElementById('none_checkbox_' + index);
      hidden_checkbox_mod = document.getElementById('mod_checkbox_' + index);
      hidden_checkbox_sev = document.getElementById('sev_checkbox_' + index);
      hidden_checkbox_mild = document.getElementById('sev_checkbox_' + index);

      off_hidden_checkbox = document.getElementById('mod' + index);
      on_label_checkbox = document.getElementById('mod_lable_' + index);

      off_label_checkbox_none = document.getElementById('none_lable_' + index);
      off_label_checkbox_mild = document.getElementById('mild_lable_' + index);
      off_label_checkbox_sev = document.getElementById('sev_lable_' + index);

      
      off_label_checkbox_none.setAttribute('style','color: black; background-color: ""');
      off_label_checkbox_mild.setAttribute('style','color: black; background-color: ""');
      off_label_checkbox_sev.setAttribute('style','color: black; background-color: ""');

      on_label_checkbox.setAttribute('style','color: white; background-color: lightgreen;');
        

        if(hidden_checkbox_none.checked) 
        { 
          hidden_checkbox_none.checked = false;
        }else if (hidden_checkbox_mild.checked){
          hidden_checkbox_mild.checked = false;
        }else if (hidden_checkbox_sev.checked)
        {
           hidden_checkbox_sev.checked = false;
        }
        else
        {
           hidden_checkbox_mod.checked = true;
        }

    }else if (e.id.match(/sev_btn_container_/i)){
      //updateSideEffectSevValue(e);
      index = e.id.replace("sev_btn_container_",'');
      
      hidden_checkbox_none = document.getElementById('none_checkbox_' + index);
      hidden_checkbox_mod = document.getElementById('mod_checkbox_' + index);
      hidden_checkbox_sev = document.getElementById('sev_checkbox_' + index);
      hidden_checkbox_mild = document.getElementById('sev_checkbox_' + index);

      off_hidden_checkbox = document.getElementById('sev_checkbox_' + index);
      on_label_checkbox = document.getElementById('sev_lable_' + index);

      off_label_checkbox_none = document.getElementById('none_lable_' + index);
      off_label_checkbox_mild = document.getElementById('mild_lable_' + index);
      off_label_checkbox_mod = document.getElementById('mod_lable_' + index);
      
      off_label_checkbox_none.setAttribute('style','color: black; background-color: ""');
      off_label_checkbox_mild.setAttribute('style','color: black; background-color: ""');
      off_label_checkbox_mod.setAttribute('style','color: black; background-color: ""');

      on_label_checkbox.setAttribute('style','color: white; background-color: lightgreen;');
        

        if(hidden_checkbox_none.checked) 
        { 
          hidden_checkbox_none.checked = false;
        }else if (hidden_checkbox_mild.checked){
          hidden_checkbox_mild.checked = false;
        }else if (hidden_checkbox_sev.checked)
        {
           hidden_checkbox_mod.checked = false;
        }
        else
        {
           hidden_checkbox_sev.checked = true;
        }

    }

    if (e.id.match(/pain/)){
    	x["FOLLOW UP"]["Pain"] = e.getAttribute('category');;
    }else if (e.id.match(/bleeding/)){
    	x["FOLLOW UP"]["Bleeding"] = e.getAttribute('category');;
    }else if (e.id.match(/haematoma/)){
    	x["FOLLOW UP"]["Haematoma"] = e.getAttribute('category');;
    }else if (e.id.match(/swelling/)){
    	x["FOLLOW UP"]["Swelling"] = e.getAttribute('category');;
    }else if (e.id.match(/glans damage/)){
    	x["FOLLOW UP"]["Glans damage"] = e.getAttribute('category');;
    }else if (e.id.match(/infection/)){
    	x["FOLLOW UP"]["Infection"] = e.getAttribute('category');;
    }else if (e.id.match(/wound disruption/)){
    	x["FOLLOW UP"]["Wound disruption"] = e.getAttribute('category');;
    }else if (e.id.match(/urinary problems/)){
    	x["FOLLOW UP"]["Urinary problems"] = e.getAttribute('category');;
    }

    // inputID = key + '_child_concept';
    // console.log(inputID)
    //     if(e.id.match(/none_/i)) {
    //       //__$(key).value = '';
    //       console.log(inputID)
    //       __$(inputID).value = 'None';
    //       updateSideEffectNoneValue(e);
    //     }else if(e.id.match(/sev_/i)) {
    //       //__$(key).value = '';
    //       console.log(inputID);
    //       __$(inputID).value = 'Severe';

    //       updateSideEffectSevValue(e);
    //     }else if(e.id.match(/mod_/i)) {
    //       //__$(key).value = '';
    //       __$(inputID).value = 'Moderate';
    //       updateSideEffectModValue(e);
    //     }else if(e.id.match(/mild_/i)) {
    //       //__$(key).value = '';
    //       __$(inputID).value = 'Mild';
    //       updateSideEffectMildValue(e);
    //     }

  }

  	function updateSideEffectNoneValue(obj){
      key = obj.getAttribute('key');
      sideEffectsHash[key]["none"] = 'true';
      sideEffectsHash[key]["mild"] = '';
      sideEffectsHash[key]["mod"] = '';
      sideEffectsHash[key]["sev"] = '';
    }

    function updateSideEffectMildValue(obj){
      key = obj.getAttribute('key');
      sideEffectsHash[key]["none"] = '';
      sideEffectsHash[key]["mild"] = 'True';
      sideEffectsHash[key]["mod"] = '';
      sideEffectsHash[key]["sev"] = '';
    }

   function updateSideEffectModValue(obj){
      key = obj.getAttribute('key');
      sideEffectsHash[key]["none"] = '';
      sideEffectsHash[key]["mild"] = '';
      sideEffectsHash[key]["mod"] = 'True';
      sideEffectsHash[key]["sev"] = '';
    }

    function updateSideEffectSevValue(obj){
      key = obj.getAttribute('key');
      sideEffectsHash[key]["none"] = '';
      sideEffectsHash[key]["mild"] = '';
      sideEffectsHash[key]["mod"] = '';
      sideEffectsHash[key]["sev"] = 'True';
    }

function initializeDate() {

    currentDate = new Date(sessionStorage.sessionDate)

    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    year = currentDate.getFullYear()

    month = currentDate.getMonth();

    day = currentDate.getDate();

    birthDate = new Date(sessionStorage.patientDOB);

    birth_year = birthDate.getFullYear();

    birth_month = birthDate.getMonth();

    birth_day = birthDate.getDate();



    setTimeout(__$("today").onmousedown, 0);

    setTimeout(function() {

        __$("touchscreenInput" + tstCurrentPage).value = "";

    }, 3);

    var year_plus = __$("dateselector_nextYear").onmousedown

    var year_minus = __$("dateselector_preYear").onmousedown

    __$("dateselector_nextYear").onmousedown = function() {

        if (parseInt(year) <= parseInt(__$("dateselector_year").value)) {



        } else {

            setTimeout(year_plus, 0);

        }

    }

    __$("dateselector_preYear").onmousedown = function() {

        if (parseInt(birth_year) >= parseInt(__$("dateselector_year").value)) {



        } else {

            setTimeout(year_minus, 0);

        }

    }

    var month_plus = __$("dateselector_nextMonth").onmousedown

    var month_minus = __$("dateselector_preMonth").onmousedown

    __$("dateselector_nextMonth").onmousedown = function() {

        if ((parseInt(year) <= parseInt(__$("dateselector_year").value)) &&

            (parseInt(month) <= parseInt(months.indexOf(__$("dateselector_month").value) + 1))) {

        } else {

            setTimeout(month_plus, 0);

        }

    }

    __$("dateselector_preMonth").onmousedown = function() {

        if ((parseInt(birth_year) >= parseInt(__$("dateselector_year").value)) &&

            (parseInt(birth_month) >= parseInt(months.indexOf(__$("dateselector_month").value) + 1))) {

        } else {

            setTimeout(month_minus, 0);

        }

    }

    var day_plus = __$("dateselector_nextDay").onmousedown

    var day_minus = __$("dateselector_preDay").onmousedown

    __$("dateselector_nextDay").onmousedown = function() {

        if ((parseInt(day) <= parseInt(__$("dateselector_day").value)) &&

            (parseInt(year) <= parseInt(__$("dateselector_year").value)) &&

            (parseInt(month + 1) <= parseInt(months.indexOf(__$("dateselector_month").value) + 1))) {

        } else {

            setTimeout(day_plus, 0);

        }

    }

    __$("dateselector_preDay").onmousedown = function() {

        if ((parseInt(birth_day) >= parseInt(__$("dateselector_day").value)) &&

            (parseInt(birth_year) >= parseInt(__$("dateselector_year").value)) &&

            (parseInt(birth_month + 1) >= parseInt(months.indexOf(__$("dateselector_month").value) + 1))) {

        } else {

            setTimeout(day_minus, 0);

        }

    }

}

function changeNextButton() {
    var nextButton = document.getElementById('nextButton');
    nextButton.setAttribute("onmousedown", "goNext();")
}

function goNext() {

    var field = $("touchscreenInput" + tstCurrentPage);

    if (field.name == "family_planning") {

        if (field.value == "") {
            showMessage("Please enter a value to continue.");
        } else if (field.value < 0 || field.value > 50) {
            showMessage("Value out of range (0 - 50)");
        } else {
            postFollowUp();
        }
    }
}

function postFollowUp() {
    var currentTime = moment().format(' HH:mm:ss');
    var encounter_datetime = moment(sessionStorage.sessionDate).format('YYYY-MM-DD');
    encounter_datetime += currentTime;

    var encounter = {
        encounter_type_name: 'FOLLOW UP',
        encounter_type_id: 160,
        patient_id: sessionStorage.patientID,
        encounter_datetime: encounter_datetime
    };

    submitParameters(encounter, "/encounters", "postFollowUpObs");
}

function postFollowUpObs(encounter) {

    var followUpDate = document.getElementById('follow_up_date').value;
    var advanceFollowup = document.getElementById('advance_follow_up').value;
    var excessiveSkin = document.getElementById('excessive_skin').value;
    var insufficientSkin = document.getElementById('insufficient_skin').value;
    var delayedWoundHealing = document.getElementById('delayed_wound_healing').value;
    var otherAe = document.getElementById('other_ae').value;
    var findingsSummary = document.getElementById('findings_summary').value;
    var managementFindings = document.getElementById('management_findings').value;
    var counsellingStatus = document.getElementById('counselling').value;
    var familyPlanning = __$("touchscreenInput" + tstCurrentPage).value;
    var conceptAnswers = [
    	//advance follow up answers
    	{
    		"None": 1107,
    		"Mild": 1901,
    		"Mod": 1900,
    		"Sev": 1903
    	},
        //excessive skin yes/no answers
        {
            "yes": 1065,
            "no": 1066
        },
        //insufficient_skin yes/no answers
        {
            "yes": 1065,
            "no": 1066
        },
        //delayed wound healing yes/no answers
        {
            "yes": 1065,
            "no": 1066
        },
        //counselling yes/no answers
        {
            "yes": 1065,
            "no": 1066
        }
    ];

    var advanceFollowupAnswer;
    var excessiveSkinAnswer;
    var insufficientSkinAnswer;
    var delayedWoundHealingAnswer;
    var counsellingStatusAnswer;
    switch (advanceFollowup.toUpperCase()) {
        case 'NONE':
            advanceFollowupAnswer = conceptAnswers[0]["None"];
            break;
        case 'MILD':
            advanceFollowupAnswer = conceptAnswers[0]["Mild"];
            break;
        case 'MODERATE':
            advanceFollowupAnswer = conceptAnswers[0]["Moderate"];
            break;
        case 'SEVERE':
            advanceFollowupAnswer = conceptAnswers[0]["Severe"];
            break;
    }
    switch (excessiveSkin.toUpperCase()) {
        case 'YES':
            excessiveSkinAnswer = conceptAnswers[1].yes;
            break;
        case 'NO':
            excessiveSkinAnswer = conceptAnswers[1].no;
            break;
    }
    switch (insufficientSkin.toUpperCase()) {
        case 'YES':
            insufficientSkinAnswer = conceptAnswers[2].yes;
            break;
        case 'NO':
            insufficientSkinAnswer = conceptAnswers[2].no;
            break;
    }
    switch (delayedWoundHealing.toUpperCase()) {
        case 'YES':
            delayedWoundHealingAnswer = conceptAnswers[3].yes;
            break;
        case 'NO':
            delayedWoundHealingAnswer = conceptAnswers[3].no;
            break;
    }
    switch (counsellingStatus.toUpperCase()) {
        case 'YES':
            counsellingStatusAnswer = conceptAnswers[4].yes;
            break;
        case 'NO':
            counsellingStatusAnswer = conceptAnswers[4].no;
            break;
    }

    var obs = {
        encounter_id: encounter["encounter_id"],
        observations: [{
                concept_id: 9628,
                value_datetime: followUpDate
            },
            {
                concept_id: 9632,
                value_coded: excessiveSkinAnswer
            },
            {
                concept_id: 9633,
                value_coded: insufficientSkinAnswer
            },
            {
                concept_id: 9634,
                value_coded: delayedWoundHealingAnswer
            },
            {
                concept_id: 1643,
                value_text: otherAe
            },
            {
                concept_id: 9640,
                value_text: findingsSummary
            },
            {
                concept_id: 9639,
                value_text: managementFindings
            },
            {
                concept_id: 7399,
                value_coded: counsellingStatusAnswer
            },
            {
                concept_id: 8080,
                value_numeric: familyPlanning
            }
        ]
    };

	var follow_up_concepts = {"Pain": 9593, "Bleeding": 7918, 
				"Haematoma": 7761, "Swelling": 6001, "Glans damage": 9629, 
				"Infection": 8626, "Wound disruption": 9630, "Urinary problems": 9631, 
				"none": 1107, "mild": 1901, "moderate": 1900, "severe": 1903}

		if (x["FOLLOW UP"]["Pain"] !== null){
			obs.observations.push({concept_id: follow_up_concepts["Pain"], value_coded: follow_up_concepts[x["FOLLOW UP"]["Pain"]]})
		}
		if (x["FOLLOW UP"]["Bleeding"] !== null){
			obs.observations.push({concept_id: follow_up_concepts["Bleeding"], value_coded: follow_up_concepts[x["FOLLOW UP"]["Bleeding"]]})
		}
		if (x["FOLLOW UP"]["Haematoma"] !== null){
			obs.observations.push({concept_id: follow_up_concepts["Haematoma"], value_coded: follow_up_concepts[x["FOLLOW UP"]["Haematoma"]]})
		}
		if (x["FOLLOW UP"]["Swelling"] !== null){
			obs.observations.push({concept_id: follow_up_concepts["Swelling"], value_coded: follow_up_concepts[x["FOLLOW UP"]["Swelling"]]})
		}if (x["FOLLOW UP"]["Glans damage"] !== null){
			obs.observations.push({concept_id: follow_up_concepts["Glans damage"], value_coded: follow_up_concepts[x["FOLLOW UP"]["Glans damage"]]})
		}if (x["FOLLOW UP"]["Infection"] !== null){
			obs.observations.push({concept_id: follow_up_concepts["Infection"], value_coded: follow_up_concepts[x["FOLLOW UP"]["Infection"]]})
		}if (x["FOLLOW UP"]["Wound disruption"] !== null){
			obs.observations.push({concept_id: follow_up_concepts["Wound disruption"], value_coded: follow_up_concepts[x["FOLLOW UP"]["Wound disruption"]]})
		}if (x["FOLLOW UP"]["Urinary problems"] !== null){
			obs.observations.push({concept_id: follow_up_concepts["Urinary problems"], value_coded: follow_up_concepts[x["FOLLOW UP"]["Urinary problems"]]})
		}

	    submitParameters(obs, "/observations", "nextPage")
	}

function nextPage(){

  nextEncounter(patientID, programID);

}