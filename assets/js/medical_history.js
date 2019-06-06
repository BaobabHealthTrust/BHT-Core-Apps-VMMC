  
  var patientID = sessionStorage.patientID;
  var patientID = sessionStorage.getItem("patientID");
  var programID = sessionStorage.getItem("programID");
  var tt_cancel_destination = "/views/patient_dashboard.html?patient_id=" + patientID;

function displayMessage(options){

    setTimeout(function(){

        if (options == 'diabetes' && __$('diabetes').value == 'Yes')
        {
          showMessage('Note: Client has Diabetes and may not be suitable for circumcision',null,10000000000);
        }
        else if (options == 'bleeding' && __$('bleeding').value == 'Yes')
        {
          showMessage('Note: Client has Bleeding disorder and may not be suitable for circumcision',null,10000000000);
        }
        else if (options == 'ulcers' && __$('ulcers').value == 'Yes')
        {
          showMessage('Note: Client has Genital ulcers and may not be suitable for circumcision',null,10000000000);
        }
        else if (options == 'urination' && __$('urination').value == 'Yes')
        {
          showMessage('Note: Client has Painful urination and may not be suitable for circumcision',null,10000000000);
        }

       
    },100);  
}

    function changeSubmitFunction(){
  		
  	  	var answer = $("touchscreenInput" +tstCurrentPage).value;
		var nextButton = document.getElementById('nextButton');
		nextButton.setAttribute('onmousedown', 'goNext()');
	  
	}
    
    function goNext(){

    	var field = $("touchscreenInput" + tstCurrentPage);

    	if (field.name == "medical_history"){

    		if (field.value == "Yes"){
    			gotoNextPage();
    		}else if (field.value == ""){
                showMessage("Please enter a value to continue.")
            }else{
    			postMedicalHistory();
    		}

    	}else if (field.name == "other_medical_history"){

    		if (field.value == "Yes"){
    			gotoNextPage();
    		}else{
    			postMedicalHistory();
    		}

    	}else if (field.name == "other_medical_specify"){
    		if (field.value == ""){
    			showMessage("Please enter value to continue.")
    			return
    		}
    		postMedicalHistory();
    	}

    }

    function postMedicalHistory() {
        var currentTime = moment().format(' HH:mm:ss');
        var encounter_datetime = moment(sessionStorage.sessionDate).format('YYYY-MM-DD');
        encounter_datetime += currentTime;

        var encounter = {
            encounter_type_name: 'MEDICAL HISTORY',
            encounter_type_id:  30,
            patient_id: sessionStorage.patientID,
            encounter_datetime: encounter_datetime
        };

        submitParameters(encounter, "/encounters", "postMedicalHistoryObs");
    }

    function postMedicalHistoryObs(encounter) {

        var medicalHistoryStatus = document.getElementById('medical_history').value;

        var diabetesStatus = document.getElementById('diabetes').value;
        var diabetesTypeUpdate = document.getElementById('diabetes_type').value;

        var bleedingStatus = document.getElementById('bleeding').value;
        var bleedingSpecify = document.getElementById('bleeding_specify').value;

        var medicationStatus = document.getElementById('meds').value;
        var medicationSpecify = document.getElementById('meds_specify').value;

        var allergiesStatus = document.getElementById('allergies').value;
        var allergiesSpecify = document.getElementById('allergies_specify').value;

        var ulcersStatus = document.getElementById('ulcers').value;
        var ulcersSpecify = document.getElementById('ulcers_specify').value;

        var itchingStatus = document.getElementById('itching').value;
        var itchingSpecify = document.getElementById('itching_specify').value;

        var urinationStatus = document.getElementById('urination').value;
        var urinationSpecify = document.getElementById('urination_specify').value;

        var otherMedicalHistoryStatus = document.getElementById('other_medical_history').value;
        var specifyOtherCondition = __$("touchscreenInput" + tstCurrentPage).value;

        var conceptAnswers = [
            //medical history Yes/No answers
            {
              "yes": 1065,
              "no": 1066
            },
            //diabetes Yes/No answers
            {
              "yes": 1065,
              "no": 1066
            },
            //Diabetes type
            {
                "Type 1 diabetes": 6409,
                "Type 2 diabetes": 6410,
                "Unknown type": 7736
            },
            //bleeding Yes/No answers
            {
              "yes": 1065,
              "no": 1066
            },
            //medication Yes/No answers
            {
              "yes": 1065,
              "no": 1066
            },
            //allergies Yes/No answers
            {
              "yes": 1065,
              "no": 1066
            },
            //ulcers Yes/No answers
            {
              "yes": 1065,
              "no": 1066
            },
            //itching Yes/No answers
            {
              "yes": 1065,
              "no": 1066
            },
            //urination Yes/No answers
            {
              "yes": 1065,
              "no": 1066
            },
            //other medical condition Yes/No answers
            {
              "yes": 1065,
              "no": 1066
            }
        ];

        var medicalHistoryAnswer;
        var diabetesStatusAnswer;
        var diabetesTypeAnswer;
        var bleedingStatusAnswer;        
        var medicationStatusAnswer;
        var allergiesStatusAnswer;
        var ulcersStatusAnswer;
        var itchingStatusAnswer;
        var urinationStatusAnswer;
        var otherMedicalAnswer;
        switch (medicalHistoryStatus.toUpperCase()) {
            case 'YES':
                medicalHistoryAnswer = conceptAnswers[0].yes;
                break;
            case 'NO':
                medicalHistoryAnswer = conceptAnswers[0].no;
                break;
            default:
                break;
        }
        switch (diabetesStatus.toUpperCase()) {
            case 'YES':
                diabetesStatusAnswer = conceptAnswers[1].yes;
                break;
            case 'NO':
                diabetesStatusAnswer = conceptAnswers[1].no;
                break;
            default:
                break;
        }
        switch (diabetesTypeUpdate.toUpperCase()) {
            case 'TYPE 1 DIABETES':
                diabetesTypeAnswer = conceptAnswers[2]["Type 1 diabetes"];
                break;
            case 'TYPE 2 DIABETES':
                diabetesTypeAnswer = conceptAnswers[2]["Type 2 diabetes"];
                break;
            case 'UNKNOWN TYPE':
                diabetesTypeAnswer = conceptAnswers[2].unknownType;
                break;
        } 
        switch (bleedingStatus.toUpperCase()) {
            case 'YES':
                bleedingStatusAnswer = conceptAnswers[3].yes;
                break;
            case 'NO':
                bleedingStatusAnswer = conceptAnswers[3].no;
                break;
            default:
                break;
        }
        switch (medicationStatus.toUpperCase()) {
            case 'YES':
                medicationStatusAnswer = conceptAnswers[4].yes;
                break;
            case 'NO':
                medicationStatusAnswer = conceptAnswers[4].no;
                break;
            default:
                break;
        }
        switch (allergiesStatus.toUpperCase()) {
            case 'YES':
                allergiesStatusAnswer = conceptAnswers[5].yes;
                break;
            case 'NO':
                allergiesStatusAnswer = conceptAnswers[5].no;
                break;
            default:
                break;
        }
        switch (ulcersStatus.toUpperCase()) {
            case 'YES':
                ulcersStatusAnswer = conceptAnswers[6].yes;
                break;
            case 'NO':
                ulcersStatusAnswer = conceptAnswers[6].no;
                break;
            default:
                break;
        } 
        switch (itchingStatus.toUpperCase()) {
            case 'YES':
                itchingStatusAnswer = conceptAnswers[7].yes;
                break;
            case 'NO':
                itchingStatusAnswer = conceptAnswers[7].no;
                break;
            default:
                break;
        }
        switch (urinationStatus.toUpperCase()) {
            case 'YES':
                urinationStatusAnswer = conceptAnswers[8].yes;
                break;
            case 'NO':
                urinationStatusAnswer = conceptAnswers[8].no;
                break;
            default:
                break;
        }  
        switch (otherMedicalHistoryStatus.toUpperCase()) {
            case 'YES':
                otherMedicalAnswer = conceptAnswers[9].yes;
                break;
            case 'NO':
                otherMedicalAnswer = conceptAnswers[9].no;
                break;
            default:
                break;
        }

            var obs = {
            encounter_id: encounter["encounter_id"],
            observations: [
                { concept_id: 9645, value_coded: medicalHistoryAnswer },
                { concept_id: 3720, value_coded: diabetesStatusAnswer },
                { concept_id: 6411, value_coded: diabetesTypeAnswer },
                { concept_id: 9574, value_coded: bleedingStatusAnswer },
                { concept_id: 9646, value_text: bleedingSpecify },
                { concept_id: 9575, value_coded: medicationStatusAnswer},
                { concept_id: 9647, value_text: medicationSpecify },
                { concept_id: 9576, value_coded: allergiesStatusAnswer},
                { concept_id: 9648, value_text: allergiesSpecify },
                { concept_id: 864, value_coded: ulcersStatusAnswer },
                { concept_id: 9649, value_text: ulcersSpecify },
                { concept_id: 9577, value_coded: itchingStatusAnswer },
                { concept_id: 9650, value_text: itchingSpecify },
                { concept_id: 9578, value_coded: urinationStatusAnswer },
                { concept_id: 9651, value_text: urinationSpecify },
                { concept_id: 6768, value_coded: otherMedicalAnswer },
                { concept_id: 9652, value_text: specifyOtherCondition }
            ]
        };
        submitParameters(obs, "/observations", "nextPage")
        return;
    }

function nextPage(){

  nextEncounter(patientID, programID);

}