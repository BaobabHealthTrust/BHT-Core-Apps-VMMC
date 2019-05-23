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
    var time = '12:45';
    time_with_colon = time.replace(":", '');

    $("nextButton").removeAttribute("onmousedown");
    $("nextButton").onmousedown = function() {
        current_input_value = parseInt($("touchscreenInput" + tstCurrentPage).value.replace(":", ''));
        if (current_input_value > parseInt(time_with_colon)) {
            gotoNextPage();
        } else {
            showMessage("Time greater than time left on the table (<b>" + time + "</b>)")
        }
    }
}

// function changeNextButton() {
//     var nextButton = document.getElementById('nextButton');
//     nextButton.setAttribute("onmousedown", "postPostOpReview();")
// }



function changeNextButton(){
        
    var answer = $("touchscreenInput" +tstCurrentPage).value;
    var nextButton = document.getElementById('nextButton');
    nextButton.setAttribute('onmousedown', 'goNext()');      

}
    
function goNext(){

    var field = $("touchscreenInput" + tstCurrentPage);

        if (field.name == "ready_for_discharge"){

            if (field.value == "Yes"){
                gotoNextPage();
            }else{
                postPostOpReview();
            }

        }else if (field.name == "appointment_date"){
            if (field.value == ""){
                showMessage("Please enter value to continue.")
                return
            }
            postPostOpReview();
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
    var pulseStatus = document.getElementById('pulse').value;
    var systolicBloodPressure = document.getElementById('systolic_blood_pressure').value;
    var diastolicBloodPressure = document.getElementById('diastolic_blood_pressure').value;
    var typeOfPain = document.getElementById('type_of_pain').value;
    var bandageType = document.getElementById('bandage').value;
    var otherAeType = document.getElementById('other_ae').value;
    var specifyOtherAe = document.getElementById('specify_other_ae').value;
    var medsGiven = document.getElementById('meds_given?').value;
    var medicationSpecify = document.getElementById('medication').value;
    var readyForDischarge = document.getElementById('ready_for_discharge').value;
    var appointmentDate = document.getElementById('appointment_date').value;
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
                value_datetime: postReviewTime
            },
            {
                concept_id: 5087,
                value_numeric: pulseStatus
            },
            {
                concept_id: 5085,
                value_numeric: systolicBloodPressure
            },
            {
                concept_id: 5086,
                value_numeric: diastolicBloodPressure
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
            },
            {
                concept_id: 5096,
                value_datetime: appointmentDate
            }
        ]
    };
    submitParameters(obs, "/observations", "nextPage")
    return;
}

function nextPage() {
    window.location.href = "/views/patient_dashboard.html?patient_id=" + patientID;
}