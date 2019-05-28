var currentTime = moment().format(' HH:mm:ss');
var tstCurrentDate = moment(tstCurrentDate).format("YYYY-MM-DD");
var patientID = sessionStorage.patientID;
var patientID = sessionStorage.getItem("patientID");
var programID = sessionStorage.getItem("programID");
var patientAge = sessionStorage.patientAge;
var tt_cancel_destination = "/views/patient_dashboard.html?patient_id=" + patientID;
var anaesthesia_time = "";
var anaesthesia_time_with_colon;
var incision_time = "";
var incision_time_with_colon;
var currentYear = moment(tstCurrentDate).format("YYYY");
var currentMonth = moment(tstCurrentDate).format("MM");
var todayDate = new Date(tstCurrentDate);

function updateAnaesTime() {
    anaesthesia_time = $("touchscreenInput" + tstCurrentPage).value.replace(":", '');
    anaesthesia_time_with_colon = $("touchscreenInput" + tstCurrentPage).value
}

function updateIncisionTime() {
    incision_time = $("touchscreenInput" + tstCurrentPage).value.replace(":", '');
    incision_time_with_colon = $("touchscreenInput" + tstCurrentPage).value
}

function changeDecimalToColon() {
    decimal = jQuery("#decimal")[0];
    decimal.innerHTML = '<span>:</span>';
    decimal.setAttribute("onmousedown", "press(':')")
}

function checkAge(age) {
    if (patientAge <= 15 && __$('procedure_type').value == 'Forceps Guided') {
        showMessage('Note: Forceps guided is not recommended for clients under the age of 15', null, 10000000000);
        return;
    } else if (patientAge > 15 && __$('procedure_type').value == 'Dorsal Slit') {
        showMessage('Note: Dorsal Slit is recommended for clients under the age of 15', null, 10000000000);
    }
}

function checkTime() {
    incision_time = $("touchscreenInput" + tstCurrentPage).value.replace(":", '');

    if (parseInt(anaesthesia_time) > parseInt(incision_time)) {
        alert('Time greater than anaesthesia time');
        return false;
    } else {}
}

function changeDefaultSettings() {
    $("nextButton").removeAttribute("onmousedown");
    $("nextButton").onmousedown = function() {
        current_input_value = parseInt($("touchscreenInput" + tstCurrentPage).value.replace(":", ''));
        if (current_input_value > parseInt(anaesthesia_time)) {
            gotoNextPage();
        } else {
            showMessage("Time greater than anaesthesia time (<b>" + anaesthesia_time_with_colon + "</b>)")
        }
    }
}

function changeSettings() {
    $("nextButton").removeAttribute("onmousedown");
    $("nextButton").onmousedown = function() {
        current_input_value = parseInt($("touchscreenInput" + tstCurrentPage).value.replace(":", ''));
        if (current_input_value > parseInt(incision_time)) {
            gotoNextPage();
        } else {
            showMessage("Time greater than incision time (<b>" + incision_time_with_colon + "</b>)")
        }
    }
}


function updateAssistantCircumciserDetails() {
    $("nextButton").removeAttribute("onmousedown");
    $("nextButton").onmousedown = function() {

        given_name = $("given_name").value;
        family_name = $("touchscreenInput" + tstCurrentPage).value;

        names = given_name + " " + family_name;
        $("assistant_circumciser_details").value = names;
        gotoNextPage();
    }
}

function setAbsoluteMaxYear() {

    var y = document.getElementById('touchscreenInput' + tstCurrentPage);

    var minYear = moment(sessionStorage.sessionDate).format("DD-MM-YYYY");
    var maxYear = moment(sessionStorage.sessionDate).add(3, "months").format("DD-MM-YYYY");

    y.setAttribute('max', maxYear);
    y.setAttribute('min', minYear);
}

function submitButton() {

    var nextButton = document.getElementById('nextButton');

    nextButton.onmousedown = function() {

        var ftype = document.getElementById('touchscreenInput' + tstCurrentPage).getAttribute('field_type');

        if (ftype !== null && ftype.toLowerCase() === 'date') {

            checkMaxAndValue();

        } else {

            gotoNextPage();

        }

    }

}

function checkMaxAndValue() {

    var yearInput = document.getElementById('touchscreenInput' + tstCurrentPage);

    var yearInputValue = yearInput.value;

    var maxValue = yearInput.max

    var minYear = moment(sessionStorage.sessionDate).format("DD-MM-YYYY");

    var maxYear = moment(sessionStorage.sessionDate).add(3, "months").format("DD-MM-YYYY");

    var inputDate = moment(yearInputValue.toString().split("-").reverse().join("-")).format("DD-MM-YYYY");;

    var maxDate = moment(maxValue.split("-").reverse().join("-")).format("DD-MM-YYYY");

    if (inputDate < minYear && inputDate !== 'Invalid date') {

        showMessage('Value less than minimum ' + minYear);

        return;

    } else if (inputDate > maxYear && inputDate !== 'Invalid date') {

        showMessage('Value less than minimum ' + maxYear);

    } else {

        gotoNextPage();
    }

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
    nextButton.setAttribute("onmousedown", "postCircumcision();")
}


function postCircumcision() {
    var currentTime = moment().format(' HH:mm:ss');
    var encounter_datetime = moment(sessionStorage.sessionDate).format('YYYY-MM-DD');
    encounter_datetime += currentTime;

    var encounter = {
        encounter_type_name: 'CIRCUMCISION',
        encounter_type_id: 158,
        patient_id: sessionStorage.patientID,
        encounter_datetime: encounter_datetime
    };

    submitParameters(encounter, "/encounters", "postCircumcisioObs");
}

function postCircumcisioObs(encounter) {

    var circumcisionDate = document.getElementById('circumcision_date').value;
    var anaesthesiaTime = document.getElementById('anaesthesia_time').value;
    var anaesthesiaType = document.getElementById('anaesthesia_type').value;
    var anaesthesiaStatus = document.getElementById('anaesthesia').value;
    var lidocaineQuantity = document.getElementById('lidocaine_quantity').value;
    var lidocaineMls = document.getElementById('lidocaine_mls').value;
    var bupivacaineQuantity = document.getElementById('bupivacaine_quantity').value;
    var bupivacaineMls = document.getElementById('bupivacaine_mls').value;
    var procedureType = document.getElementById('procedure_type').value;
    var otherProcedureType = document.getElementById('other_procedure_type').value;
    var incisionTime = document.getElementById('incision_time').value;
    var adverseEvents = document.getElementById('adverse_events?').value;
    var specificAdverseEvent = document.getElementById('specific_adverse_event').value;
    var specificAdverseEventManagement = document.getElementById('specific_adverse_event_management').value;
    var timeLeftTable = document.getElementById('time_left_table').value;
    var givenName = document.getElementById('given_name').value;
    var familyName = document.getElementById('family_name').value;
    var conceptAnswers = [
        //anaesthesia type answers
        {
            "Local Anaesthesia": 9606,
            "General Anaesthesia": 9607
        },
        //Anaesthesia answers
        {
            "Lidocaine": 4039,
            "Bupivacaine": 6823
        },
        //procedure type answers
        {
            "Forceps Guided": 9608,
            "Dorsal Slit": 9609,
            "Device": 9610,
            "Other": 6408
        },
        //adverse events yes/no answers
        {
            "yes": 1065,
            "no": 1066
        }
    ];

    var anaesthesiaTypeAnswer;
    var anaesthesiaStatusAnswer;
    var procedureTypeAnswer;
    var adverseEventsAnswer;
    switch (anaesthesiaType.toUpperCase()) {
        case 'LOCAL ANAESTHESIA':
            anaesthesiaTypeAnswer = conceptAnswers[0]["Local Anaesthesia"];
            break;
        case 'GENERAL ANAESTHESIA':
            anaesthesiaTypeAnswer = conceptAnswers[0]["General Anaesthesia"];
            break;
    }
    switch (anaesthesiaStatus.toUpperCase()) {
        case 'LIDOCAINE':
            anaesthesiaStatusAnswer = conceptAnswers[1]["Lidocaine"];
            break;
        case 'BUBIVACAINE':
            anaesthesiaStatusAnswer = conceptAnswers[1]["Bupivacaine"];
            break;
    }
    switch (procedureType.toUpperCase()) {
        case 'FORCEPS GUIDED':
            procedureTypeAnswer = conceptAnswers[2]["Forceps Guided"];
            break;
        case 'DORSAL SLIT':
            procedureTypeAnswer = conceptAnswers[2]["Dorsal Slit"];
            break;
        case 'DEVICE':
            procedureTypeAnswer = conceptAnswers[2]["Device"];
            break;
        case 'OTHER':
            procedureTypeAnswer = conceptAnswers[2]["Other"];
            break;
    }
    switch (adverseEvents.toUpperCase()) {
        case 'YES':
            adverseEventsAnswer = conceptAnswers[3].yes;
            break;
        case 'NO':
            adverseEventsAnswer = conceptAnswers[3].no;
            break;
        default:
            break;
    }

    var obs = {
        encounter_id: encounter["encounter_id"],
        observations: [{
                concept_id: 9583,
                value_datetime: circumcisionDate
            },
            {
                concept_id: 9584,
                value_text: anaesthesiaTime
            },
            {
                concept_id: 9585,
                value_coded: anaesthesiaTypeAnswer
            },
            {
                concept_id: 9635,
                value_coded: anaesthesiaStatusAnswer
            },
            {
                concept_id: 9668,
                value_numeric: lidocaineQuantity
            },
            {
                concept_id: 9669,
                value_numeric: lidocaineMls
            },
            {
                concept_id: 9668,
                value_numeric: bupivacaineQuantity
            },
            {
                concept_id: 9669,
                value_numeric: bupivacaineMls
            },
            {
                concept_id: 9587,
                value_coded: procedureTypeAnswer
            },
            {
                concept_id: 7215,
                value_text: otherProcedureType
            },
            {
                concept_id: 9588,
                value_text: incisionTime
            },
            {
                concept_id: 9589,
                value_coded: adverseEventsAnswer
            },
            {
                concept_id: 9643,
                value_text: specificAdverseEvent
            },
            {
                concept_id: 9639,
                value_text: specificAdverseEventManagement
            },
            {
                concept_id: 9591,
                value_text: timeLeftTable
            },
            {
                concept_id: 6346,
                value_text: givenName
            },
            {
                concept_id: 6347,
                value_text: familyName
            }
        ]
    };
    submitParameters(obs, "/observations", "nextPage")
    return;
}

function nextPage() {
    window.location.href = "/views/patient_dashboard.html?patient_id=" + patientID;
}