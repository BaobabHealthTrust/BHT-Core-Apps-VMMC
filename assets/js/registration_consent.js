var tstCurrentDate = moment(tstCurrentDate).format("YYYY-MM-DD");

var currentTime = moment().format(' HH:mm:ss');

var tstCurrentDate = moment(tstCurrentDate).format("YYYY-MM-DD");

var apiProtocol = sessionStorage.apiProtocol;

var apiURL = sessionStorage.apiURL;

var apiPort = sessionStorage.apiPort;

var patient_id = sessionStorage.patientID;

var patientID = sessionStorage.getItem("patientID");

var programID = sessionStorage.programID;

var patientAge = moment().diff(moment(sessionStorage.birthdate), 'years');

var tt_cancel_destination = "/views/patient_dashboard.html?patient_id=" + patient_id;

var timedEvent;

var consent_obs = []

var YesNoConcepts = {
    "Yes": 1065,
    "No": 1066
};
var knowledge_source = {
    "Friend": 5618,
    "Family": 9570,
    "Partner or Spouse": 5617,
    "Health care worker": 1538,
    "Poster/Newspaper/Leaflet": 9571,
    "Community Mobiliser": 9572,
    "Television/Radio": 9573,
    "Other": 6408
}
function verifyConsentAge() {
    var field = $("touchscreenInput" + tstCurrentPage);
    if (patientAge <= 13) {
        __$('consent').setAttribute('helpText', 'Has the Guardian/Parent given consent?');
    }
}

function changeSubmitFunction() {

    var answer = $("touchscreenInput" + tstCurrentPage).value;
    var nextButton = document.getElementById('nextButton');
    nextButton.setAttribute('onmousedown', 'goNext()');

}

function goNext() {

    var field = $("touchscreenInput" + tstCurrentPage);

    if (field.name == "consent") {

        if (field.value == "Yes") {
            gotoNextPage();
        } else if (field.value == "") {
            showMessage("Please enter a value to continue.")
        } else {
            submitConsentEncounter();
        }

    } else if (field.name == "knowledge_source") {
        if (field.value == "") {
            showMessage("Please enter value to continue.")
            return
        } else if (field.value.match(/Other/gi)) {
            gotoNextPage();
        } else {
            submitConsentEncounter();
        }

    } else if (field.name == "other") {
        if (field.value == "") {
            showMessage("Please enter value to continue.")
            return
        } else {
            submitConsentEncounter();
        }
    }

}

function submitConsentEncounter() {

    var currentTime = moment().format(' HH:mm:ss');

    var encounter_datetime = moment(sessionStorage.sessionDate).format('YYYY-MM-DD');

    encounter_datetime += currentTime;

    var encounter = {

        encounter_type_name: 'REGISTRATION CONSENT',

        encounter_type_id: 162,

        patient_id: patient_id,

        encounter_datetime: encounter_datetime

    }

    submitParameters(encounter, "/encounters", "postConsentObs");

}

function postConsentObs(encounter) {

    var field = $("touchscreenInput" + tstCurrentPage);


    var obs = {

        encounter_id: encounter.encounter_id,

        observations: [

            {
                concept_id: 9420,
                value_coded: YesNoConcepts[$('consent').value]
            }

        ]

    }

    if (field.name == "knowledge_source"){
        getKnowledgeSourceObs();
    }

    if (consent_obs.length > 0) {

        for (var i = 0; i < consent_obs.length; i++) {

            obs.observations.push(consent_obs[i]);

        }

    }

    if (field.name == "other"){

        var otherStatus = field.value;
        obs.observations.push({concept_id: 6408, value_text: otherStatus});
    }


    submitParameters(obs, "/observations", "nextPage")

}

function nextPage(){

  nextEncounter(patientID, programID);

}

function getKnowledgeSourceObs() {

    consent_obs = []

    var nodes = __$("knowledge_source").children;

    for (var i = 0; i < nodes.length; i++) {

        if (nodes[i].value != "none" && nodes[i] && nodes[i].innerHTML != "") {

            var id = nodes[i].value;

            var hash = {
                "concept_id": "",
                value_coded: ""
            }

            if (id && !__$('img' + (i - 1)).src.match("unticked")) {

                hash["concept_id"] = 9598

                hash["value_coded"] = parseInt(knowledge_source[id])

                consent_obs.push(hash);

            }

        }

    }

    //submitConsentEncounter();

}

function buildConceptsHash() {

    var count = 0;

    var inputArr = document.getElementsByTagName("input")

    conceptHash = {};

    for (var i = 0; i < inputArr.length; i++) {

        if (inputArr[i].name && inputArr[i].name.match("concept_name") && inputArr[i].name.match("observations")) {

            conceptHash[count] = inputArr[i].value;

            count++;

        }

    }

}