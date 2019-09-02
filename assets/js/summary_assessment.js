
  var currentTime = moment().format(' HH:mm:ss');
  var tstCurrentDate = moment(tstCurrentDate).format("YYYY-MM-DD");
  var patientID = sessionStorage.patientID;
  var patientID = sessionStorage.getItem("patientID");
  var programID = sessionStorage.getItem("programID");
  var tt_cancel_destination = "/views/patient_dashboard.html?patient_id=" + patientID;

    function changeNextButton() {
        var nextButton =  document.getElementById('nextButton');
        nextButton.setAttribute("onmousedown","postSummaryAssessment();")
    }


    function postSummaryAssessment() {
        var currentTime = moment().format(' HH:mm:ss');
        var encounter_datetime = moment(sessionStorage.sessionDate).format('YYYY-MM-DD');
        encounter_datetime += currentTime;

        var encounter = {
            encounter_type_name: 'SUMMARY ASSESSMENT',
            encounter_type_id:  161,
            patient_id: sessionStorage.patientID,
            encounter_datetime: encounter_datetime
        };

        submitParameters(encounter, "/encounters", "postSummaryAssessmentObs");
    }

    function postSummaryAssessmentObs(encounter) {

        var contraindicationsStatus = document.getElementById('contraindications').value;
        var contraindicationsOptionsStatus = document.getElementById('contraindications_options').value;
        var otherContraindicationsStatus = document.getElementById('other_contraindications').value;
        var SpecifyContraindicationsStatus = document.getElementById('Specify_contraindications').value;        
        var circumcisionAssessmentStatus = document.getElementById('circumcision_assessment').value;
        var notSuitableStatus = document.getElementById('not_suitable').value;
        var circumcisionConsentStatus = document.getElementById('circumcision_consent').value;
        var conceptAnswers = [
            //contraindications Yes/No answers
            {
              "yes": 1065,
              "no": 1066
            },
            //contraindications options answers
            {
              "Active or symptomatic STIs": 9744,
              "Hypertension": 903,
              "Diabetes": 3720,
              "Bleeding disorder": 9574,
              "Erectile dysfunction": 9745,
              "Anatomical deformities of the penis e.g. hypospodiasis": 9746,
              "Chronic paraphimosis": 9747,
              "Penile cancer": 8424,
              "Other chronic disorders of the penis e.g. filariasis": 9748
            },
            //Circumcision Assessment Yes/No answers
            {
              "yes": 1065,
              "no": 1066
            },
            //Circumcision Consent Yes/No answers
            {
              "yes": 1065,
              "no": 1066
            }
        ];

        var contraindicationsStatusAnswer;
        var contraindicationsOptionsAnswer;
        var circumcisionAssessmentStatusAnswer;       
        var circumcisionConsentAnswer;
        switch (contraindicationsStatus.toUpperCase()) {
            case 'YES':
                contraindicationsStatusAnswer = conceptAnswers[0].yes;
                break;
            case 'NO':
                contraindicationsStatusAnswer = conceptAnswers[0].no;
                break;
        }
        switch (contraindicationsOptionsStatus.toUpperCase()) {
            case 'ACTIVE OR SYMPTOMATIC STIS':
                contraindicationsOptionsAnswer = conceptAnswers[1]["Active or symptomatic STIs"];
                break;
            case 'HYPERTENSION':
                contraindicationsOptionsAnswer = conceptAnswers[1]["Hypertension"];
                break;
            case 'DIABETES':
            	contraindicationsOptionsAnswer = conceptAnswers[1]["Diabetes"];
                break;
            case 'BLEEDING DISORDER':
            	contraindicationsOptionsAnswer = conceptAnswers[1]["Bleeding disorder"];
            	break;
            case 'ELECTILE DYSFUNCTION':
            	contraindicationsOptionsAnswer = conceptAnswers[1]["Erectile dysfunction"];
            	break;
            case 'ANATOMICAL DEFORMITIES OF THE PENIS E.G. HYPOSPODIASIS':
            	contraindicationsOptionsAnswer = conceptAnswers[1]["Anatomical deformities of the penis e.g. hypospodiasis"];
            	break;
            case 'CHRONIC PARAPHIMOSIS':
            	contraindicationsOptionsAnswer = conceptAnswers[1]["Chronic paraphimosis"];
            	break;
            case 'PENILE CANCER':
            	contraindicationsOptionsAnswer = conceptAnswers[1]["Penile cancer"];
            	break;
            case 'OTHER CHRONIC DISORDERS OF THE PENIS E.G. FILARIASIS':
            	contraindicationsOptionsAnswer = conceptAnswers[1]["Other chronic disorders of the penis e.g. filariasis"];
            	break;
        } 
        switch (circumcisionAssessmentStatus.toUpperCase()) {
            case 'YES':
                circumcisionAssessmentStatusAnswer = conceptAnswers[2].yes;
                break;
            case 'NO':
                circumcisionAssessmentStatusAnswer = conceptAnswers[2].no;
                break;
            default:
                break;
        }
        switch (circumcisionConsentStatus.toUpperCase()) {
            case 'YES':
                circumcisionConsentAnswer = conceptAnswers[3].yes;
                break;
            case 'NO':
                circumcisionConsentAnswer = conceptAnswers[3].no;
                break;
            default:
                break;
        }
        var obs = {
            encounter_id: encounter["encounter_id"],
            observations: [
                { concept_id: 9641, value_coded: contraindicationsStatusAnswer },
                { concept_id: 9661, value_coded: contraindicationsOptionsAnswer },
                { concept_id: 7215, value_text: otherContraindicationsStatus },
                { concept_id: 9642, value_text: SpecifyContraindicationsStatus },
                { concept_id: 9643, value_coded: circumcisionAssessmentStatusAnswer }
                
                ]
            };

            if ((__$('circumcision_assessment').value == 'Yes')){

                obs.observations.push({ concept_id: 9644, value_coded: circumcisionConsentAnswer })
            } else{

                if(__$("touchscreenInput" + tstCurrentPage).name == 'not_suitable') {
                   obs.observations.push({ concept_id: 7215, value_text: __$("touchscreenInput" + tstCurrentPage).value})

                }else{
                  obs.observations.push({ concept_id: 7215, value_text: notSuitableStatus })
                }
            }

        submitParameters(obs, "/observations", "nextPage")
        return;
    }

function nextPage(){

  nextEncounter(patientID, programID);

}