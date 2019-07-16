var patientID = sessionStorage.patientID;
var patientID = sessionStorage.getItem("patientID");
var programID = sessionStorage.getItem("programID");
var tstCurrentDate = moment(tstCurrentDate).format("YYYY-MM-DD");
var tt_cancel_destination = "/views/patient_dashboard.html?patient_id=" + patientID;

function changeNextButton() {
    var nextButton = document.getElementById('nextButton');
    nextButton.setAttribute("onmousedown", "postHivStatus();")
}


function postHivStatus() {
    var currentTime = moment().format(' HH:mm:ss');
    var encounter_datetime = moment(sessionStorage.sessionDate).format('YYYY-MM-DD');
    encounter_datetime += currentTime;

    var encounter = {
        encounter_type_name: 'UPDATE HIV STATUS',
        encounter_type_id: 39,
        patient_id: sessionStorage.patientID,
        encounter_datetime: encounter_datetime
    };

    submitParameters(encounter, "/encounters", "postHivStatusObs");
}

function postHivStatusObs(encounter) {

    var previousHivStatus = document.getElementById('previous_hiv_done').value;
    var hivResultStatus = document.getElementById('hiv_test_result').value;
    var currentArtStatus = document.getElementById('currently_on_art').value;    
    var currentHivStatus = document.getElementById('hiv_test_done_today?').value;
    var currentHivResult = document.getElementById('current_hiv_test_result').value;
    var startedArtStatus = document.getElementById('started_art').value;
    var testReason = document.getElementById('hiv_test_not_done_reason').value;

    var conceptAnswers = [
        //previous hiv done Yes No answers
        {
            "yes": 1065,
            "no": 1066
        },
        //previous hiv result
        {
            "positive": 703,
            "negative": 664,
            "indeterminate": 1138
        },
        //currently on art Yes No answers
        {
            "yes": 1065,
            "no": 1066
        },
        //hiv test done today Yes No answers
        {
            "yes": 1065,
            "no": 1066
        },
        //current hiv Status update
        {
            "positive": 703,
            "negative": 664,
            "indeterminate": 1138
        },
        //started art today Yes No answers
        {
            "yes": 1065,
            "no": 1066
        },
        // Reason HIV Test not done
        {
            "refused": 9601,
            "previousPositive": 9602,
            "noReagentsAvailable": 9603
        }
    ];

    var previousHivStatusAnswer;
    var hivResultStatusAnswer;
    var currentArtStatusAnswer;
    var currentHivStatusAnswer;
    var currentHivResultAnswer;
    var startedArtStatusAnswer;
    var testReasonAnswer;
    switch (previousHivStatus.toUpperCase()) {
        case 'YES':
            previousHivStatusAnswer = conceptAnswers[0].yes;
            break;
        case 'NO':
            previousHivStatusAnswer = conceptAnswers[0].no;
            break;
        default:
            break;
    }
    switch (hivResultStatus.toUpperCase()) {
        case 'POSITIVE':
            hivResultStatusAnswer = conceptAnswers[1].positive;
            break;
        case 'NEGATIVE':
            hivResultStatusAnswer = conceptAnswers[1].negative;
            break;
        case 'INDETERMINATE':
            hivResultStatusAnswer = conceptAnswers[1].indeterminate;
            break;
    }
    switch (currentArtStatus.toUpperCase()) {
        case 'YES':
            currentArtStatusAnswer = conceptAnswers[2].yes;
            break;
        case 'NO':
            currentArtStatusAnswer = conceptAnswers[2].no;
            break;
        default:
            break;
    }
    switch (currentHivStatus.toUpperCase()) {
        case 'YES':
            currentHivStatusAnswer = conceptAnswers[3].yes;
            break;
        case 'NO':
            currentHivStatusAnswer = conceptAnswers[3].no;
            break;
        default:
            break;
    }
    switch (currentHivResult.toUpperCase()) {
        case 'POSITIVE':
            currentHivResultAnswer = conceptAnswers[4].positive;
            break;
        case 'NEGATIVE':
            currentHivResultAnswer = conceptAnswers[4].negative;
            break;
        case 'INDETERMINATE':
            currentHivResultAnswer = conceptAnswers[4].indeterminate;
            break;
    }
    switch (startedArtStatus.toUpperCase()) {
        case 'YES':
            startedArtStatusAnswer = conceptAnswers[5].yes;
            break;
        case 'NO':
            startedArtStatusAnswer = conceptAnswers[5].no;
            break;
        default:
            break;
    }
    switch (testReason.toUpperCase()) {
        case 'REFUSED':
            testReasonAnswer = conceptAnswers[6].refused;
            break;
        case 'PREVIOUS POSITIVE':
            testReasonAnswer = conceptAnswers[6].previousPositive;
            break;
        case 'NO REAGENTS AVAILABLE':
            testReasonAnswer = conceptAnswers[6].noReagentsAvailable;
    }

    var obs = {
        encounter_id: encounter["encounter_id"],
        observations: [{
                concept_id: 9655,
                value_coded: previousHivStatusAnswer
            },
            {
                concept_id: 9656,
                value_coded: hivResultStatusAnswer
            },
            {
                concept_id: 7010,
                value_coded: currentArtStatusAnswer
            },
            {
                concept_id: 9568,
                value_coded: currentHivStatusAnswer
            },
            {
                concept_id: 2169,
                value_coded: currentHivResultAnswer

            },
            {
                concept_id: 8883,
                value_coded: startedArtStatusAnswer
            },
            {
                concept_id: 9569,
                value_coded: testReasonAnswer
            }
        ]
    };
    submitParameters(obs, "/observations", "nextPage")
    return;
}

function nextPage(){

  nextEncounter(patientID, programID);

}