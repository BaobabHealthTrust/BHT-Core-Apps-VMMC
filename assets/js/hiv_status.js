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

    var hivStatusUpdate = document.getElementById('known_hiv_positive').value;
    var artStatus = document.getElementById('currently_taking_arvs').value;
    var hivTestDone = document.getElementById('hiv_test_done_today?').value;
    var currentHivStatus = document.getElementById('hiv_test_result').value;
    var hivNotDone = document.getElementById('hiv_test_not_done_reason').value;

    var conceptAnswers = [
        //Yes No answers
        {
            "yes": 1065,
            "no": 1066
        },
        //Yes No answers
        {
            "yes": 1065,
            "no": 1066
        },
        //Yes No answers
        {
            "yes": 1065,
            "no": 1066
        },
        //Status update
        {
            "positive": 703,
            "negative": 664,
            "indeterminate": 1138
        },
        // Reason HIV Test not done
        {
            "refused": 9601,
            "previousPositive": 9602,
            "noReagentsAvailable": 9603
        }
    ];

    var hivStatusUpdateAnswer;
    var artStatusAnswer;
    var hivTestDoneAnswer;
    var hivStatusAnswer;
    var hivNotDoneAnswer;
    switch (hivStatusUpdate.toUpperCase()) {
        case 'YES':
            hivStatusUpdateAnswer = conceptAnswers[0].yes;
            break;
        case 'NO':
            hivStatusUpdateAnswer = conceptAnswers[0].no;
            break;
        default:
            break;
    }
    switch (artStatus.toUpperCase()) {
        case 'YES':
            artStatusAnswer = conceptAnswers[1].yes;
            break;
        case 'NO':
            artStatusAnswer = conceptAnswers[1].no;
            break;
        default:
            break;
    }
    switch (hivTestDone.toUpperCase()) {
        case 'YES':
            hivTestDoneAnswer = conceptAnswers[2].yes;
            break;
        case 'NO':
            hivTestDoneAnswer = conceptAnswers[2].no;
            break;
        default:
            break;
    }
    switch (currentHivStatus.toUpperCase()) {
        case 'POSITIVE':
            hivStatusAnswer = conceptAnswers[3].positive;
            break;
        case 'NEGATIVE':
            hivStatusAnswer = conceptAnswers[3].negative;
            break;
        case 'INDETERMINATE':
            hivStatusAnswer = conceptAnswers[3].indeterminate;
            break;
    }
    switch (hivNotDone.toUpperCase()) {
        case 'REFUSED':
            hivNotDoneAnswer = conceptAnswers[4].refused;
            break;
        case 'PREVIOUS POSITIVE':
            hivNotDoneAnswer = conceptAnswers[4].previousPositive;
            break;
        case 'NO REAGENTS AVAILABLE':
            hivNotDoneAnswer = conceptAnswers[4].noReagentsAvailable;
    }

    var obs = {
        encounter_id: encounter["encounter_id"],
        observations: [{
                concept_id: 9566,
                value_coded: hivStatusUpdateAnswer
            },
            {
                concept_id: 9567,
                value_coded: artStatusAnswer
            },
            {
                concept_id: 9568,
                value_coded: hivTestDoneAnswer
            },
            {
                concept_id: 9228,
                value_coded: hivStatusAnswer
            },
            {
                concept_id: 9569,
                value_coded: hivNotDoneAnswer
            }
        ]
    };
    submitParameters(obs, "/observations", "nextPage")
    return;
}

function nextPage() {
    window.location.href = "/views/patient_dashboard.html?patient_id=" + patientID;
}