var currentTime = moment().format(' HH:mm:ss');
var tstCurrentDate = moment(tstCurrentDate).format("YYYY-MM-DD");
var patientID = sessionStorage.patientID;
var patientID = sessionStorage.getItem("patientID");
var programID = sessionStorage.getItem("programID");
var tt_cancel_destination = "/views/patient_dashboard.html?patient_id=" + patientID;


function displayMessage(options) {

    setTimeout(function() {

        if (options == 'ulcer_id' && __$('ulcer_id').value == 'Yes') {
            showMessage('Note: Client has Ulcer and may not be suitable for circumcision', null, 10000000000);
        } else if (options == 'urethral_id' && __$('urethral_id').value == 'Yes') {
            showMessage('Note: Client has Urethral Discharge and may not be suitable for circumcision', null, 10000000000);
        } else if (options == 'swelling_id' && __$('swelling_id').value == 'Yes') {
            showMessage('Note: Client has Scrotum swelling/tenderness and may not be suitable for circumcision', null, 10000000000);
        }

    }, 100);
}

function changeSubmitFunction() {

    var answer = $("touchscreenInput" + tstCurrentPage).value;
    var nextButton = document.getElementById('nextButton');
    nextButton.setAttribute('onmousedown', 'goNext()');

}

function goNext() {

    var field = $("touchscreenInput" + tstCurrentPage);

    if (field.name == "circumcision_idd") {

        if (field.value != "Full") {
            gotoNextPage();
        } else {
            postGenitalExam();
        }

    } else if (field.name == "any_abnormality") {

        if (field.value == "Yes") {
            gotoNextPage();
        } else {
            postGenitalExam();
        }

    } else if (field.name == "other_abnormalities") {
        if (field.value == "") {
            showMessage("Please enter value to continue.")
            return
        }
        postGenitalExam();
    }

}

function postGenitalExam() {
    var currentTime = moment().format(' HH:mm:ss');
    var encounter_datetime = moment(sessionStorage.sessionDate).format('YYYY-MM-DD');
    encounter_datetime += currentTime;

    var encounter = {
        encounter_type_name: 'GENITAL EXAMINATION',
        encounter_type_id: 157,
        patient_id: sessionStorage.patientID,
        encounter_datetime: encounter_datetime
    };

    submitParameters(encounter, "/encounters", "postGenitalExamObs");
}

function postGenitalExamObs(encounter) {

    var circumcisionStatus = document.getElementById('circumcision_idd').value;
    var phimosisStatus = document.getElementById('phimosis_id').value;
    var ulcerStatus = document.getElementById('ulcer_id').value;
    var urethralStatus = document.getElementById('urethral_id').value;
    var swellingStatus = document.getElementById('swelling_id').value;
    var inguinalNodesStatus = document.getElementById('inguinal_nodes_id').value;
    var anyAbnormalityStatus = document.getElementById('any_abnormality').value;
    var otherAbnormalitiesSpecify = document.getElementById('other_abnormalities').value;
    var conceptAnswers = [
        //circumcision id answers
        {
            "Full": 9582,
            "Part": 8512,
            "None": 1107
        },
        //phimosis Yes/No answers
        {
            "yes": 1065,
            "no": 1066
        },
        //ulcers Yes/No answers
        {
            "yes": 1065,
            "no": 1066
        },
        //urethral Yes/No answers
        {
            "yes": 1065,
            "no": 1066
        },
        //swelling Yes/No answers
        {
            "yes": 1065,
            "no": 1066
        },
        //Inguinal Nodes Yes/No answers
        {
            "yes": 1065,
            "no": 1066
        },
        //Any Abnormality Yes/No answers
        {
            "yes": 1065,
            "no": 1066
        }
    ];

    var circumcisionStatusAnswer;
    var phimosisStatusAnswer;
    var ulcerStatusAnswer;
    var urethralStatusAnswer;
    var swellingStatusAnswer;
    var inguinalNodesStatusAnswer;
    var anyAbnormalityStatusAnswer;
    switch (circumcisionStatus.toUpperCase()) {
        case 'FULL':
            circumcisionStatusAnswer = conceptAnswers[0].Full;
            break;
        case 'PART':
            circumcisionStatusAnswer = conceptAnswers[0].Part;
            break;
        case 'NONE':
            circumcisionStatusAnswer = conceptAnswers[0].None;
            break;
    }
    switch (phimosisStatus.toUpperCase()) {
        case 'YES':
            phimosisStatusAnswer = conceptAnswers[1].yes;
            break;
        case 'NO':
            phimosisStatusAnswer = conceptAnswers[1].no;
            break;
        default:
            break;
    }
    switch (ulcerStatus.toUpperCase()) {
        case 'YES':
            ulcerStatusAnswer = conceptAnswers[2].yes;
            break;
        case 'NO':
            ulcerStatusAnswer = conceptAnswers[2].no;
            break;
        default:
            break;
    }
    switch (urethralStatus.toUpperCase()) {
        case 'YES':
            urethralStatusAnswer = conceptAnswers[3].yes;
            break;
        case 'NO':
            urethralStatusAnswer = conceptAnswers[3].no;
            break;
        default:
            break;
    }
    switch (swellingStatus.toUpperCase()) {
        case 'YES':
            swellingStatusAnswer = conceptAnswers[4].yes;
            break;
        case 'NO':
            swellingStatusAnswer = conceptAnswers[4].no;
            break;
        default:
            break;
    }
    switch (inguinalNodesStatus.toUpperCase()) {
        case 'YES':
            inguinalNodesStatusAnswer = conceptAnswers[5].yes;
            break;
        case 'NO':
            inguinalNodesStatusAnswer = conceptAnswers[5].no;
            break;
        default:
            break;
    }
    switch (anyAbnormalityStatus.toUpperCase()) {
        case 'YES':
            anyAbnormalityStatusAnswer = conceptAnswers[6].yes;
            break;
        case 'NO':
            anyAbnormalityStatusAnswer = conceptAnswers[6].no;
            break;
        default:
            break;
    }

    var obs = {
        encounter_id: encounter["encounter_id"],
        observations: [{
                concept_id: 9579,
                value_coded: circumcisionStatusAnswer
            },
            {
                concept_id: 9580,
                value_coded: phimosisStatusAnswer
            },
            {
                concept_id: 9600,
                value_coded: ulcerStatusAnswer
            },
            {
                concept_id: 5995,
                value_coded: urethralStatusAnswer
            },
            {
                concept_id: 8444,
                value_coded: swellingStatusAnswer
            },
            {
                concept_id: 9581,
                value_coded: inguinalNodesStatusAnswer
            },
            {
                concept_id: 8404,
                value_coded: anyAbnormalityStatusAnswer
            },
            {
                concept_id: 7215,
                value_text: otherAbnormalitiesSpecify
            }
        ]
    };
    submitParameters(obs, "/observations", "nextPage")
    return;
}

function nextPage() {
    window.location.href = "/views/patient_dashboard.html?patient_id=" + patientID;
}