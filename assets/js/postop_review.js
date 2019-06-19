var currentTime = moment().format(' HH:mm:ss');
var tstCurrentDate = moment(tstCurrentDate).format("YYYY-MM-DD");
var patientID = sessionStorage.patientID;
var patientID = sessionStorage.getItem("patientID");
var programID = sessionStorage.getItem("programID");
var time = "";
var time_with_colon;
var tt_cancel_destination = "/views/patient_dashboard.html?patient_id=" + patientID;

function changeDecimalToColon() {
    decimal = jQuery("#decimal")[0];
    decimal.innerHTML = '<span>:</span>';
    decimal.setAttribute("onmousedown", "press(':')")
}

function displayMessage(options) {

    setTimeout(function() {

        if (options == 'systolic_blood_pressure' && __$('systolic_blood_pressure').value >= 140 && __$('systolic_blood_pressure').value <= 150) {
            showMessage('Note: Client Systolic Blood Pressure is high', null, 10000000000);
        } else if (options == 'diastolic_blood_pressure' && __$('diastolic_blood_pressure').value >= 50 && __$('diastolic_blood_pressure').value <= 90) {
            showMessage('Note: Client Diastolic Blood Pressure is high', null, 10000000000);
        }

    }, 100);
}

function updateTimeLeft() {
    time = $("touchscreenInput" + tstCurrentPage).value.replace(":", '');
    time_with_colon = $("touchscreenInput" + tstCurrentPage).value
}

function postOp() {

    $("nextButton").removeAttribute("onmousedown");
    $("nextButton").onmousedown = function() {
        current_input_value = parseInt($("touchscreenInput" + tstCurrentPage).value.replace(":", ''));
        console.log((time_with_colon));
        if (current_input_value > parseInt(time.replace(":", ""))) {
            gotoNextPage();
        } else {
            showMessage("Time less than time left on the table (<b>" + time + "</b>)")
        }
    }
}

// function getTime() {
//     console.log("reee");
//     var url = apiProtocol + "://" + apiURL + ":" + apiPort;
//     url += "/api/v1/observations?person_id=" + sessionStorage.patientID + "&concept_id=9591";
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
//         var obj = JSON.parse(this.responseText);
//         console.log(obj);
//     }
//     xhttp.open("GET", url, true);
//     xhttp.setRequestHeader(
//       "Authorization",
//       sessionStorage.getItem("authorization")
//     );
//     xhttp.setRequestHeader("Content-type", "application/json");
//     xhttp.send();
//   }
// }


function getTime() {
    var url = apiProtocol + "://" + apiURL + ":" + apiPort;
    url += "/api/v1/observations?person_id=" + sessionStorage.patientID + "&concept_id=9591";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
        var obj = JSON.parse(this.responseText);
        if (obj.length > 0) {
          time = obj[obj.length - 1].value_text;
          return time;
        }
      }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader(
      "Authorization",
      sessionStorage.getItem("authorization")
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
  }
// function changeNextButton() {
//     var nextButton = document.getElementById('nextButton');
//     nextButton.setAttribute("onmousedown", "postPostOpReview();")
// }

function getHeight(patient_id) {
    var url = apiProtocol + "://" + apiURL + ":" + apiPort;
    url += "/api/v1/observations?person_id=" + patient_id + "&concept_id=5090";
    url +=
      "&date=" +
      moment(new Date(sessionStorage.sessionDate)).format("YYYY-MM-DD");
    url += "&page_size=1";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
        var obj = JSON.parse(this.responseText);
        if (obj.length > 0) {
          sessionStorage.currentHeightObsID = obj[0].obs_id;
          var height = parseInt(obj[0].value_numeric);
          if (height > 0) {
            sessionStorage.currentHeight = height;
          } else if (obj[0].value_text.length > 0) {
            sessionStorage.currentHeight = parseInt(obj[0].value_text);
          } else {
            sessionStorage.currentHeight = 0;
          }
        }
      }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader(
      "Authorization",
      sessionStorage.getItem("authorization")
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
  }

function changeNextButton(){
        
    var answer = $("touchscreenInput" +tstCurrentPage).value;
    var nextButton = document.getElementById('nextButton');
    nextButton.setAttribute('onmousedown', 'postPostOpReview()');      

}

const HIV_PROGRAM_ID = 1

    if (sessionStorage.patientAge === "null") {
        getDemographics(patientID);
    }

        function getHeight(patient_id) {
        var url = apiProtocol + "://" + apiURL + ":" + apiPort;
        url += "/api/v1/observations?person_id=" + patient_id + "&concept_id=5090";
        url += "&date=" + moment(new Date(sessionStorage.sessionDate)).format('YYYY-MM-DD');
        url += "&page_size=1";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
                var obj = JSON.parse(this.responseText);
                if (obj.length > 0) {
                    sessionStorage.currentHeightObsID = obj[0].obs_id;
                    var height = parseInt(obj[0].value_numeric);
                    if (height > 0) {
                        sessionStorage.currentHeight = height;
                    } else if (obj[0].value_text.length > 0) {
                        sessionStorage.currentHeight = parseInt(obj[0].value_text);

                    } else {
                        sessionStorage.currentHeight = 0;
                    }
                } else {
                    sessionStorage.currentHeight = 0;
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
        xhttp.setRequestHeader('Content-type', "application/json");
        xhttp.send();
    }

    getHeight(patientID);


       var show_bp_only = false;

    try {
      var url = window.location.href;
      url = new URL(url);
      var bp_only = url.searchParams.get("bp_only");
      show_bp_only = (bp_only == 'true' ? true : false);
      console.log(show_bp_only)
    }catch(z) {
      show_bp_only = false;
    }

    var vitalsEntered = {};


    if (sessionStorage.programID == 12) {

            var vitalsAssigned = [
            ["Weight", "weight.png", "(KG)"],
            ["Height", "height.png", "(CM)"],
            ["BP", "bp.png", "(mmHG)"]
        ];
    } else{

        var vitalsAssigned = [
            ["BP", "bp.png", "(mmHG)"],
            ["Pulse", "pulse-rate.png", "(BPM)"]
        ];
    }

    if(show_bp_only)
      vitalsAssigned = [["BP", "bp.png", "(mmHG)"]];

    if (sessionStorage.patientAge > 18 && sessionStorage.currentHeight != 0 && sessionStorage.currentHeight != "null") {
        // vitalsAssigned.splice(1, 1);
    }

    function removeFromHash() {
        var allButtons = document.getElementsByClassName('app-btn');
        var currentVital = null;

        for (var i = 0; i < allButtons.length; i++) {
            if (allButtons[i].getAttribute('class').trim() == "app-btn") {
                vitalsEntered[allButtons[i].id] = null;
                break;
            }
        }


    }

    function setEnterVital() {
        var allButtons = document.getElementsByClassName('app-btn');
        var currentVital = null;

        for (var i = 0; i < allButtons.length; i++) {
            if (allButtons[i].getAttribute('class').trim() == "app-btn") {

                var vital = document.getElementById('vitals-input').value.trim();
                if (vital) {
                    vitalsEntered[allButtons[i].id] = vital;
                    break;
                }

                if (vitalsEntered[allButtons[i].id]) {

                }

            }
        }

    }


    function buildVitalsPage() {
        var inputFrame = document.getElementById("inputFrame" + tstCurrentPage);
        inputFrame.style = "width: 96%;";

        var mainContainer = document.createElement('div');
        mainContainer.setAttribute("class", "main-table-div");

        var mainContainerRow = document.createElement('div');
        mainContainerRow.setAttribute("class", "main-table-div-row");
        mainContainer.appendChild(mainContainerRow);

        var cells = ['left', 'right', 'summary'];
        for (var i = 0; i < cells.length; i++) {
            var mainContainerCell = document.createElement('div');
            mainContainerCell.setAttribute("class", "main-table-div-cell cell-" + cells[i]);

            if (cells[i] == 'left') {
                buildVitalsButtons(mainContainerCell);
            }

            mainContainerRow.appendChild(mainContainerCell);
        }

        inputFrame.appendChild(mainContainer);
    }

    function buildVitalsButtons(element) {
        var buttons = vitalsAssigned;

        var btnCont = document.createElement('div')
        btnCont.setAttribute('class', "table-main");
        for (var i = 0; i < buttons.length; i++) {
            if (vitalsAssigned[i][0] === "Height" && sessionStorage.patientAge > 18 && sessionStorage.currentHeight != 0 && sessionStorage.currentHeight != "null") {
                // table.innerHTML += "<tr><th>Height<td id='previous-Height'></td><td>"+sessionStorage.currentHeight+" (CM)</td></th></tr>";
            } else {
                var btnContRow = document.createElement('div')
                btnContRow.setAttribute('class', "table-main-row");
                btnCont.appendChild(btnContRow);
                var cell = document.createElement('div');
                cell.setAttribute('class', "table-main-cell separator");
                cell.innerHTML = '&nbsp;'


                var btnContRow = document.createElement('div')
                btnContRow.setAttribute('class', "table-main-row");
                var cell = document.createElement('div');
                btnContRow.appendChild(cell);
                cell.setAttribute('class', "table-main-cell");
                buildBTN(cell, buttons[i], i);
                btnCont.appendChild(btnContRow);
            }

        }

        element.appendChild(btnCont);
    }

    function buildBTN(element, name, i) {
        var a = document.createElement('a');
        if (i == 0) {
            a.setAttribute("class", "app-btn");
        } else {
            a.setAttribute("class", "app-btn button-diabled");
        }

        a.setAttribute("href", "#");

        var img = document.createElement('img');
        img.setAttribute("src", "/../../assets/images/vitals/" + name[1])
        img.setAttribute("class", "btn-icons");

        var span = document.createElement('span');
        span.appendChild(img);


        a.innerHTML = span.innerHTML;
        a.innerHTML += "<br />" + name[0];
        a.setAttribute("onmousedown", "setVital(this)");
        a.setAttribute("id", "vitals-" + name[0]);
        element.appendChild(a);

        if (!vitalsEntered["vitals-" + name[0]])
            vitalsEntered["vitals-" + name[0]] = null;

    }

    function setVital(e) {
        var validInput = validateUserInput();

        if (!validInput)
            return;

        setEnterVital();

        var allButtons = document.getElementsByClassName("app-btn");
        for (var i = 0; i < allButtons.length; i++) {
            allButtons[i].setAttribute("class", "app-btn button-diabled");
        }

        e.setAttribute("class", "app-btn");
        document.getElementById("vitals-input").value = vitalsEntered[e.id];
    }

    function validateUserInput() {
        var allButtons = document.getElementsByClassName("app-btn");
        var activeInput = null;

        for (var i = 0; i < allButtons.length; i++) {
            if (allButtons[i].getAttribute("class").trim() == "app-btn") {
                activeInput = allButtons[i];
                break;
            }
        }

        var data = document.getElementById("vitals-input").value;
        var validation_result = false;

        if (activeInput.id.match(/bp/i)) {
            validation_result = validateBP(data);
        } else if (activeInput.id.match(/Pulse/i)) {
            validation_result = validatePulse(data);
        } else {
            validation_result = true;
        }


        return validation_result;
    }

    function validatePulse(pulse) {
        if (pulse.trim().length < 1)
            return true;

        if (!isNumeric(pulse)) {
            showMessage("Not a valid Pulse Rate.<br />Please enter a valid reading.");
            return false;
        }

        if (pulse < 50 || pulse > 120) {
            showMessage("Pulse reading is out of bounds");
            return false;
        }

        return true;
    }

    function showValidate(message) {
        if (message == null) {
            message = "is this a valid input"
        }


        messageBar.innerHTML = "";
        messageBar.innerHTML += "<p>" + ((message.match(/^Value\s/)) ? (message.replace(/^Value\s/, "The value is ")) : message) +
            ". Are you sure about this value?</p><div style='display: block;'>" +
            "<button class='button' style='float: none;' onclick='this.offsetParent.style.display=\"none\"; goToSpo();' onmousedown='this.offsetParent.style.display=\"none\";goToSpo();'" +
            "><span>Yes</span></button><button class='button' " +
            "style='float: none; right: 3px;' onmousedown='this.offsetParent.style.display=\"none\"; '>" +
            "<span>No</span></button>";
        messageBar.style.display = "block";
    }

    function showConfirm(message, returnFunction) {

        messageBar.innerHTML = "";
        messageBar.innerHTML += "<p>" + ((message.match(/^Value\s/)) ? (message.replace(/^Value\s/, "")) : message) +
            ". Are you sure about this value?</p><div style='display: block;'>" +
            "<button class='button' style='float: none;' onclick='this.offsetParent.style.display=\"none\";" + returnFunction + "();' onmousedown='this.offsetParent.style.display=\"none\";" + returnFunction + "();'" +
            "><span>Yes</span></button><button class='button' " +
            "style='float: none; right: 3px;' onmousedown='this.offsetParent.style.display=\"none\"; '>" +
            "<span>No</span></button>";
        messageBar.style.display = "block";
    }

    function validateBP(bp) {
        if (bp.trim().length < 1)
            return true;

        if (!(bp.indexOf(".") == -1)) {
            showMessage("Please remove decimal(s).");
            return false;
        }

        if (!(bp.indexOf("%") == -1)) {
            showMessage("Please remove %.");
            return false;
        }

        if ((bp.indexOf("/") == -1)) {
            showMessage("Not a valid BP reading.<br />Please add '/' in between the numbers.");
            return false;
        }

        if (bp.split("/").length != 2) {
            showMessage("Not a valid BP reading.");
            return false;
        }

        bp_diastolic = bp.split("/")[1];
        bp_systolic = bp.split("/")[0];

        if (sessionStorage.programID == 12) {

        } else {
            // Validations NOT for ANC
            if (bp_diastolic < 30 || bp_diastolic > 200) {

                showMessage("Diastolic reading is out of normal range");
                return false;

            }

            if (bp_systolic < 40 || bp_systolic > 250) {

                showMessage("Systolic reading is out of normal range");
                return true;

            }
        }

        if (!isNumeric(bp_systolic)) {
            showMessage("Not a valid systolic reading.");
            return false;
        }

        if (!isNumeric(bp_diastolic)) {
            showMessage("Not a valid diastolic reading.");
            return false;
        }

        return true;
    }

    /* .................................... validation helpers .......... */
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function changeNextBtn() {
        var nextBtn = document.getElementById('nextButton');
        nextBtn.setAttribute("onmousedown", "validateEntries();");
    }

    function validateEntries() {

        var validationANS = validateUserInput();
        if (!validationANS)
            return;

        if(show_bp_only == false) {
          if (document.getElementById("td-BP").innerHTML.length < 1) {
              showMessage("Systolic and Diastolic BP can not be empty");
              return;
          }
          if (document.getElementById("td-Pulse").innerHTML.length < 1) {
              showMessage("Pulse rate can not be empty");
              return;
          }
        }
        gotoNextPage();
    }

    function changeNextBtnToSubmit() {
        var nextBtn = document.getElementById('nextButton');
        nextBtn.setAttribute("onmousedown", "submitVitals();");
        nextBtn.setAttribute("onclick", "");
    }

    function initializeVariables() {
        jQuery(".loader").show();
        jQuery('#keyboard').hide();
        jQuery("#buttons").hide();
        jQuery("#tt_page_weight_kg").hide();
        jQuery("#inputFrame" + tstCurrentPage).hide();

        var weight_height_age_url = apiProtocol + "://" + apiURL + ":" + apiPort;
        weight_height_age_url += "/api/v1/patients/" + sessionStorage.patientID + "/median_weight_height";

        var patient_weight_for_height_values_url = apiProtocol + "://" + apiURL + ":" + apiPort;
        patient_weight_for_height_values_url += "/api/v1/patient_weight_for_height_values"; //NOT patient specific

        var get_person_url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/patients/" + patient_id;

        var height_url = apiProtocol + "://" + apiURL + ":" + apiPort;
        height_url += "/api/v1/observations?person_id=" + sessionStorage.patientID;
        height_url += "&concept_id=" + height_concept_id;

        var xhttp1 = new XMLHttpRequest();
        xhttp1.onreadystatechange = function () {
            if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
                var obj = JSON.parse(this.responseText);
                obj = obj["person"];
                patient_age = Math.round(moment().diff(obj["birthdate"], 'years', true));
                if (patient_age <= 14) {
                    var xhttp2 = new XMLHttpRequest();
                    xhttp2.onreadystatechange = function () {
                        if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
                            patient_median_Weight_height = JSON.parse(this.responseText);
                            var xhttp3 = new XMLHttpRequest();
                            xhttp3.onreadystatechange = function () {
                                if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
                                    patient_weight_for_height_values = JSON.parse(this.responseText);
                                    getHTNActivationStatus();
                                }
                            };
                            xhttp3.open("GET", patient_weight_for_height_values_url, true);
                            xhttp3.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
                            xhttp3.setRequestHeader('Content-type', "application/json");
                            xhttp3.send();
                        }
                    };

                    xhttp2.open("GET", weight_height_age_url, true);
                    xhttp2.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
                    xhttp2.setRequestHeader('Content-type', "application/json");
                    xhttp2.send();
                } else {
                    var xhttp4 = new XMLHttpRequest();
                    xhttp4.onreadystatechange = function () {
                        if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
                            var height_obs = JSON.parse(this.responseText);
                            if (height_obs.length > 0) {
                                currentHeight = height_obs[0].value_numeric;
                                if (!currentHeight) {
                                    currentHeight = height_obs[0].value_text;
                                }
                            }
                            getHTNActivationStatus();
                        }
                    };
                    xhttp4.open("GET", height_url, true);
                    xhttp4.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
                    xhttp4.setRequestHeader('Content-type', "application/json");
                    xhttp4.send();

                }
            }
        };
        xhttp1.open("GET", get_person_url, true);
        xhttp1.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
        xhttp1.setRequestHeader('Content-type', "application/json");
        xhttp1.send();
    }

    var htn_activated = false;

    function getHTNActivationStatus() {
        var htn_property_url = apiProtocol + "://" + apiURL + ":" + apiPort;
        htn_property_url += "/api/v1/global_properties?property=activate.htn.enhancement";

        var bp_info_url = apiProtocol + "://" + apiURL + ":" + apiPort;
        bp_info_url += "/api/v1/observations?person_id=" + sessionStorage.patientID;
        bp_info_url += "&concept_id=" + treatment_status_concept_id;

        var xhttp1 = new XMLHttpRequest();
        xhttp1.onreadystatechange = function () {
            if (this.readyState == 4 && (this.status == 201 || this.status == 200 || this.status == 404)) {
                try {
                    var activate_htn_enhancement_property = JSON.parse(this.responseText);
                    if (activate_htn_enhancement_property["activate.htn.enhancement"] == "true") {
                        htn_activated = true
                    }
                } catch (e) {

                }

                var xhttp2 = new XMLHttpRequest();
                xhttp2.onreadystatechange = function () {
                    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
                        var bp_treatment_status_obs = JSON.parse(this.responseText);
                        if (bp_treatment_status_obs.length > 0) {
                            bp_treatment_info_available = true;
                        }

                        gotoNextPage();
                    }
                };
                xhttp2.open("GET", bp_info_url, true);
                xhttp2.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
                xhttp2.setRequestHeader('Content-type', "application/json");
                xhttp2.send();
            }
        };
        xhttp1.open("GET", htn_property_url, true);
        xhttp1.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
        xhttp1.setRequestHeader('Content-type', "application/json");
        xhttp1.send();
    }

    function resetPage() {
        jQuery('#keyboard').show();
        jQuery("#buttons").show();
        jQuery("#innerPop").show()
        jQuery("#inputFrame" + tstCurrentPage).show();
        jQuery(".loader").hide();
    }

    var modal = document.getElementById('myModal');

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

function postPostOpReview() {
    var currentTime = moment().format(' HH:mm:ss');
    var encounter_datetime = moment(sessionStorage.sessionDate).format('YYYY-MM-DD');
    encounter_datetime += currentTime;

    var encounter = {
        encounter_type_name: 'POST-OP REVIEW',
        encounter_type_id: 159,
        patient_id: sessionStorage.patientID,
        encounter_datetime: encounter_datetime
    };

    submitParameters(encounter, "/encounters", "postPostOpReviewObs");
}

function postPostOpReviewObs(encounter) {

    var postReviewTime = document.getElementById('post_review_time').value;
    var typeOfPain = document.getElementById('type_of_pain').value;
    var bandageType = document.getElementById('bandage').value;
    var otherAeType = document.getElementById('other_ae').value;
    var specifyOtherAe = document.getElementById('specify_other_ae').value;
    var medsGiven = document.getElementById('meds_given?').value;
    var medicationSpecify = document.getElementById('medication').value;
    var readyForDischarge = __$("touchscreenInput" + tstCurrentPage).value;
    var conceptAnswers = [
        //type of pain answers
        {
            "None": 1107,
            "Mild": 1901,
            "Moderate": 1900,
            "Severe": 1903
        },
        //bandage answers
        {
            "Dry": 8608,
            "Spot": 9604,
            "Soak": 9605
        },
        //other ae answers
        {
            "None": 1107,
            "Mild": 1901,
            "Moderate": 1900,
            "Severe": 1903
        },
        //meds given yes/no answers
        {
            "yes": 1065,
            "no": 1066
        },
        //ready_for_discharge yes/no answers
        {
            "yes": 1065,
            "no": 1066
        }
    ];

    var typeOfPainAnswer;
    var bandageTypeAnswer;
    var otherAeTypeAnswer;
    var medsGivenAnswer;
    var readyForDischargeAnswer;
    switch (typeOfPain.toUpperCase()) {
        case 'NONE':
            typeOfPainAnswer = conceptAnswers[0]["None"];
            break;
        case 'MILD':
            typeOfPainAnswer = conceptAnswers[0]["Mild"];
            break;
        case 'MODERATE':
            typeOfPainAnswer = conceptAnswers[0]["Moderate"];
            break;
        case 'SEVERE':
            typeOfPainAnswer = conceptAnswers[0]["Severe"];
            break;
    }
    switch (bandageType.toUpperCase()) {
        case 'DRY':
            bandageTypeAnswer = conceptAnswers[1]["Dry"];
            break;
        case 'SPOT':
            bandageTypeAnswer = conceptAnswers[1]["Spot"];
            break;
        case 'SOAK':
            bandageTypeAnswer = conceptAnswers[1]["Soak"];
            break;
    }
    switch (otherAeType.toUpperCase()) {
        case 'NONE':
            otherAeTypeAnswer = conceptAnswers[2]["None"];
            break;
        case 'MILD':
            otherAeTypeAnswer = conceptAnswers[2]["Mild"];
            break;
        case 'MODERATE':
            otherAeTypeAnswer = conceptAnswers[2]["Moderate"];
            break;
        case 'SEVERE':
            otherAeTypeAnswer = conceptAnswers[2]["Severe"];
            break;
    }
    switch (medsGiven.toUpperCase()) {
        case 'YES':
            medsGivenAnswer = conceptAnswers[3].yes;
            break;
        case 'NO':
            medsGivenAnswer = conceptAnswers[3].no;
            break;
        default:
            break;
    }
    switch (readyForDischarge.toUpperCase()) {
        case 'YES':
            readyForDischargeAnswer = conceptAnswers[4].yes;
            break;
        case 'NO':
            readyForDischargeAnswer = conceptAnswers[4].no;
            break;
        default:
            break;
    }

    var obs = {
        encounter_id: encounter["encounter_id"],
        observations: [{
                concept_id: 9592,
                value_text: postReviewTime
            },
            {
                concept_id: 9593,
                value_coded: typeOfPainAnswer
            },
            {
                concept_id: 9594,
                value_coded: bandageTypeAnswer
            },
            {
                concept_id: 1643,
                value_coded: otherAeTypeAnswer
            },
            {
                concept_id: 9590,
                value_text: specifyOtherAe
            },
            {
                concept_id: 9595,
                value_coded: medsGivenAnswer
            },
            {
                concept_id: 9596,
                value_text: medicationSpecify
            },
            {
                concept_id: 9597,
                value_coded: readyForDischargeAnswer
            }
        ]
    };

    for (var name in vitalsEntered) {
        
        var vital = vitalsEntered[name];
        
        vname = null;

        try {
            if (vital.length > 0) {
                        vname = name;
                    }
                } catch (e) {
                }

                if (!vname)
                    continue;

                if (name.match(/BP/i)) {
                    var bp_systolic = vital.split("/")[0];
                    var bp_diastolic = vital.split("/")[1];

                    obs.observations.push({concept_id: 5085, value_numeric: bp_systolic});
                    obs.observations.push({concept_id: 5086, value_numeric: bp_diastolic})
                } else if (name.match(/Pulse/i)) {
                    obs.observations.push({concept_id: 5087, value_numeric: vital})
                }
            }
    submitParameters(obs, "/observations", "nextPage")
    return;
}

function nextPage() {
    
    nextEncounter(patientID, programID);
}