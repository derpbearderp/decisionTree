import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

//
// DATA
//
const csvFile = "data/diabetes.csv"
const trainingLabel = "Label"
const ignored = ["Label", "Pregnant", "Age", "Bp", "Insulin","Predigree", "Skin"]
const acc = document.getElementById("acc");
const truetrue = document.getElementById("1");
const truefalse = document.getElementById("2");
const falsefalse = document.getElementById("3");
const falsetrue = document.getElementById("4");
// const labelOneBtn = document.querySelector("#save");

// labelOneBtn.addEventListener("click", () => save());

let nodiabetes = 0
let hasdiabetes = 0
let actrue = 0
let acfalse = 0 

//
// laad csv data als json
//
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => trainModel(results.data)   // gebruik deze data om te trainen
    })
}


//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {
    // todo : splits data in traindata en testdata

    data.sort(() => (Math.random() - 0.5))

    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)


    // maak het algoritme aan
    let decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        trainingSet: trainData,
        categoryAttr: trainingLabel,
        maxTreeDepth: 4
    })

    // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
    let visual = new VegaTree('#view', 800, 400, decisionTree.toJSON())


    // todo : maak een prediction met een sample uit de testdata
    let amountCorrect = 0;

    let predictedDiabetesWasDiabetes = 0;
    let predictedHealthyWasHealthy = 0;
    let predictedHealthyWasDiabetes = 0;
    let predictedDiabetesWasHealthy = 0;


    for (let row of testData) {
        let diabetesPrediction = decisionTree.predict(row)
        if (diabetesPrediction == row.Label){
            amountCorrect ++ 
        } 

        if(diabetesPrediction == 1 && row.Label == 1) {
            predictedDiabetesWasDiabetes++
        }

        if(diabetesPrediction == 0 && row.Label == 1) {
            predictedHealthyWasDiabetes++
        }

        if(diabetesPrediction == 0 && row.Label == 0) {
            predictedHealthyWasHealthy++
        }

        if(diabetesPrediction == 1 && row.Label == 0) {
            predictedDiabetesWasHealthy++
        }
        
    }
    let accuracy = amountCorrect / testData.length
    console.log(accuracy)
    acc.innerText =`accuracy: ${accuracy}`
    truetrue.innerText = `${predictedHealthyWasHealthy}`
    falsefalse.innerText = `${predictedDiabetesWasDiabetes}`
    truefalse.innerText = `${predictedHealthyWasDiabetes}`
    falsetrue.innerText = `${predictedDiabetesWasHealthy}`

    let json = decisionTree.stringify()
    console.log(json)   

}






loadData()



